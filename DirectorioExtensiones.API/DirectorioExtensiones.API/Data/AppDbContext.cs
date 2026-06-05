using Microsoft.EntityFrameworkCore;
using DirectorioExtensiones.API.Models.Entities;

namespace DirectorioExtensiones.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Extension> Extensiones => Set<Extension>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Extension>(entity =>
        {
            entity.ToTable("extensiones");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Nombre).HasColumnName("nombre").HasMaxLength(200);
            entity.Property(e => e.Departamento).HasColumnName("departamento").HasMaxLength(100);
            entity.Property(e => e.Sede).HasColumnName("sede").HasMaxLength(100);
            entity.Property(e => e.NumeroExtension).HasColumnName("numeroextension").HasMaxLength(20);
        });
    }
}
