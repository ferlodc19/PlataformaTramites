using System;

namespace TramitesApi.Models
{
    public class Registro
    {
        public int Id { get; set; }
        public string Folio { get; set; } = string.Empty;
        public DateTime FechaRegistro { get; set; } = DateTime.Now;

        // Relaciones con las demás tablas
        public DatoPersonal? DatoPersonal { get; set; }
        public DatoEconomico? DatoEconomico { get; set; }
        public Domicilio? Domicilio { get; set; }
        public Archivo? Archivo { get; set; }
    }
}