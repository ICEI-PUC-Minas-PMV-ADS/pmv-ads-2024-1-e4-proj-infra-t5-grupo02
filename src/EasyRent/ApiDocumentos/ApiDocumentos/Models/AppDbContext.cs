﻿using Microsoft.EntityFrameworkCore;

namespace ApiDocumentos.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Documento> Documentos { get; set; }
    }

}

