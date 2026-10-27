namespace TramitesApi.Models
{
    public class TramiteDTO
    {
        public string Nombre { get; set; }
        public decimal IngresoMensual { get; set; }
        public string Estado { get; set; }
        public IFormFile ArchivoPdf { get; set; }
        public IFormFile ArchivoTxt { get; set; }
    }
}