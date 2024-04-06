using Microsoft.EntityFrameworkCore;

namespace MS02_v01.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) 
        { 
        }
         
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Lancamento> Lancamentos { get; set; }
        
    }
}
