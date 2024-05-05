using Microsoft.EntityFrameworkCore;

namespace MS03.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) 
        { 
        }
        public DbSet<Lancamento> Lancamentos { get; set; }

    }
}
