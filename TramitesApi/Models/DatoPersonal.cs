namespace TramitesApi.Models
{
    public class DatoPersonal
    {
        public int Id { get; set; }
        public int RegistroId { get; set; } // Llave foránea
        
        public string? Nombres { get; set; }
        public string? Apellidos { get; set; }
        public string? FechaNacimiento { get; set; }
        public string? Sexo { get; set; }
        public string? Curp { get; set; }
        public string? EstadoCivil { get; set; }
        public string? Telefono { get; set; }
        public string? Correo { get; set; }
    }
}