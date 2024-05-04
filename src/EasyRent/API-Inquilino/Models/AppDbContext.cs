using Microsoft.EntityFrameworkCore;

namespace API_Inquilino.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Inquilino> Inquilinos { get; set; }

    }
}

