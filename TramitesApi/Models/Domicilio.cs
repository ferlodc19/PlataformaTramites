namespace TramitesApi.Models
{
    public class Domicilio
    {
        public int Id { get; set; }
        public int RegistroId { get; set; } // Llave foránea
        
        public string? CodigoPostal { get; set; }
        public string? Estado { get; set; }
        public string? Municipio { get; set; }
        public string? Colonia { get; set; }
        public string? Calle { get; set; }
        public string? NumeroExterior { get; set; }
        public string? NumeroInterior { get; set; }
    }
}