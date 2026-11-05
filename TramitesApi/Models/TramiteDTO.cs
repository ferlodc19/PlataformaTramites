using Microsoft.AspNetCore.Http;

namespace TramitesApi.Models
{
    public class TramiteDTO
    {
        // Bloque 1: Datos Personales
        public string? Nombres { get; set; }
        public string? Apellidos { get; set; }
        public string? FechaNacimiento { get; set; }
        public string? Sexo { get; set; }
        public string? Curp { get; set; }
        public string? EstadoCivil { get; set; }
        public string? Telefono { get; set; }
        public string? Correo { get; set; }

        // Bloque 2: Datos Económicos
        public string? SituacionLaboral { get; set; }
        public string? Ocupacion { get; set; }
        public string? Empresa { get; set; }
        public int DependientesEconomicos { get; set; }
        public decimal IngresoMensual { get; set; }
        public decimal EgresoMensual { get; set; }

        // Bloque 3: Datos Geográficos y Domicilio
        public string? CodigoPostal { get; set; }
        public string? Estado { get; set; }
        public string? Municipio { get; set; }
        public string? Colonia { get; set; }
        public string? Calle { get; set; }
        public string? NumeroExterior { get; set; }
        public string? NumeroInterior { get; set; }

        // Bloque 4: Documentos
        public IFormFile? ArchivoPdf { get; set; }
        public IFormFile? ArchivoTxt { get; set; }
    }
}