using Microsoft.EntityFrameworkCore;

namespace MS03.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) 
        { 
        }
         
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Lancamento> Lancamentos { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Chat>()
                .HasOne(chat => chat.Inquilino)
                .WithMany(usuario => usuario.Chats)
                .HasForeignKey(chat => chat.InquilinoId)
                .OnDelete(DeleteBehavior.Restrict);



            modelBuilder.Entity<Message>()
               .HasOne(message => message.Chat)
               .WithMany(chat => chat.Messages)
               .HasForeignKey(message => message.ChatId)
               .OnDelete(DeleteBehavior.Restrict);
        }


    }
}
