using backend.Entities;
using backend.Exceptions;
using backend.Model.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;

namespace backend.Services
{
    public interface IUserService
    {
        void Register(RegisterUserDto user);
        string Login(LoginUserDto dto);
    }
    public class UserService : IUserService
    {
        private readonly LinguistDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly AuthenticationSettings _authenticationSettings;
        public UserService(LinguistDbContext context, IPasswordHasher<User> passwordHasher, AuthenticationSettings authenticationSettings)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _authenticationSettings = authenticationSettings;
        }

        public void Register(RegisterUserDto dto)
        {
            RegisterGuard(dto);

            var user = new User()
            {
                Email = dto.Email,
                IsAdmin = false,                
            };

            var hashedPassword = _passwordHasher.HashPassword(user, dto.Password);

            user.Password = hashedPassword;
            _context.Users.Add(user);

            _context.SaveChanges();
        }

        public string Login(LoginUserDto dto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email) ?? throw new BadRequestException("User or password are incorrect.");
            if (_passwordHasher.VerifyHashedPassword(user, user.Password, dto.Password) is PasswordVerificationResult.Failed)
            {
                throw new BadRequestException("User or password are incorrect.");
            }

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email.ToString()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey!));
            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
            var expires = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);

            var token = new JwtSecurityToken(_authenticationSettings.JwtIssuer,
                _authenticationSettings.JwtIssuer,
                claims,
                expires: expires,
                signingCredentials: signingCredentials);

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token);
        }

        private bool IsRegisterInputEmpty(RegisterUserDto dto)
        {
            return string.IsNullOrEmpty(dto.Email) || string.IsNullOrEmpty(dto.Password);
        }

        private bool ValidateRegisterInput(RegisterUserDto dto)
        {
            var passwordRegex = new Regex("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");
            if (!passwordRegex.IsMatch(dto.Password))
            {
                return false;
            }

            var emailRegex = new Regex("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
            if (!emailRegex.IsMatch(dto.Email))
            {
                return false;
            }
            return true;
        }
        private bool IsUserInDb(string email)
        {
            return _context.Users.FirstOrDefault(x => x.Email == email) is null;
        }

        private void RegisterGuard(RegisterUserDto dto)
        {
            if (IsRegisterInputEmpty(dto))
            {
                throw new BadRequestException("Email or Password was empty.");
            }

            if (!ValidateRegisterInput(dto))
            {
                throw new BadRequestException("Email or Password was invalid.");
            }

            if (!IsUserInDb(dto.Email))
            {
                throw new BadRequestException("Email is taken.");
            }
        }
    }
}
