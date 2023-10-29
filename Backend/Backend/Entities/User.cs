using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace backend.Entities
{
    [Index(nameof(Email), IsUnique = true)]
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        [MaxLength(128), NotNull]
        public string Email { get; set; }
        [NotNull]
        public string Password { get; set; }
        [NotNull]
        public bool IsAdmin { get; set; }

    }
}
