using Microsoft.EntityFrameworkCore;

namespace backend.Entities
{
    public class LinguistDbContext: DbContext
    {
        public LinguistDbContext(DbContextOptions options) : base(options) { }
        public DbSet<User> Users { get; set; }
    }
}
