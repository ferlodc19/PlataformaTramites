namespace TramitesApi.Models
{
    public class DatoEconomico
    {
        public int Id { get; set; }
        public int RegistroId { get; set; } // Llave foránea
        
        public string? SituacionLaboral { get; set; }
        public string? Ocupacion { get; set; }
        public string? Empresa { get; set; }
        public int DependientesEconomicos { get; set; }
        public decimal IngresoMensual { get; set; }
        public decimal EgresoMensual { get; set; }
    }
}