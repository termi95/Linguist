using backend.Entities;
using Microsoft.AspNetCore.Identity;

namespace Backend
{
    public class Seeder
    {
        private readonly LinguistDbContext _dbContext;
        private readonly IPasswordHasher<User> _passwordHasher;
        public Seeder(LinguistDbContext context, IPasswordHasher<User> passwordHasher)
        {
            _dbContext = context;
            _passwordHasher = passwordHasher;
        }
        public void seed()
        {
            if (!_dbContext.Database.CanConnect())
            {
                return;
            }
            if (!_dbContext.Users.Any())
            {
                var user = GetAdmin();
                _dbContext.Users.Add(user);
                _dbContext.SaveChanges();
            }
        }

        private User GetAdmin()
        {
            var admin = new User()
            {
                Email = "test@test.pl",
                IsAdmin = true,
            };

            admin.Password = _passwordHasher.HashPassword(admin, "Test123$");
            return admin;
        }
    }
}
