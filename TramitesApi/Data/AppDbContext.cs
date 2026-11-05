using Microsoft.EntityFrameworkCore;
using TramitesApi.Models;

namespace TramitesApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Registro> Registros { get; set; }
        public DbSet<DatoPersonal> DatosPersonales { get; set; }
        public DbSet<DatoEconomico> DatosEconomicos { get; set; }
        public DbSet<Domicilio> Domicilios { get; set; }
        public DbSet<Archivo> Archivos { get; set; }
    }
}