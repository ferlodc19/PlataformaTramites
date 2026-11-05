namespace TramitesApi.Models
{
    public class Archivo
    {
        public int Id { get; set; }
        public int RegistroId { get; set; } // Llave foránea
        
        public string? RutaPdf { get; set; }
        public string? RutaTxt { get; set; }
    }
}