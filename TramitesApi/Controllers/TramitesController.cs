using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using TramitesApi.Models;
using TramitesApi.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace TramitesApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TramitesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TramitesController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/tramites
        [HttpPost]
        public async Task<IActionResult> CrearTramite([FromForm] TramiteDTO request)
        {
            Random random = new Random();
            string folioUnico = $"TR-{random.Next(1, 99999):D5}";

            string? pathPdf = await GuardarArchivo(request.ArchivoPdf);
            string? pathTxt = await GuardarArchivo(request.ArchivoTxt);

            var nuevoRegistro = new Registro {
                Folio = folioUnico,
                FechaRegistro = DateTime.UtcNow,
                
                // Repartimos los datos en sus respectivas tablas originales
                DatoPersonal = new DatoPersonal {
                    Nombres = request.Nombres, Apellidos = request.Apellidos,
                    FechaNacimiento = request.FechaNacimiento, Sexo = request.Sexo,
                    Curp = request.Curp, EstadoCivil = request.EstadoCivil,
                    Telefono = request.Telefono, Correo = request.Correo
                },
                DatoEconomico = new DatoEconomico {
                    SituacionLaboral = request.SituacionLaboral, Ocupacion = request.Ocupacion,
                    Empresa = request.Empresa, DependientesEconomicos = request.DependientesEconomicos,
                    IngresoMensual = request.IngresoMensual, EgresoMensual = request.EgresoMensual
                },
                Domicilio = new Domicilio {
                    CodigoPostal = request.CodigoPostal, Estado = request.Estado,
                    Municipio = request.Municipio, Colonia = request.Colonia,
                    Calle = request.Calle, NumeroExterior = request.NumeroExterior,
                    NumeroInterior = request.NumeroInterior
                },
                Archivo = new Archivo {
                    RutaPdf = pathPdf, RutaTxt = pathTxt
                }
            };
            
            _context.Registros.Add(nuevoRegistro);
            await _context.SaveChangesAsync();

            return Ok(new { Folio = folioUnico });
        }

        // GET: api/tramites/historial
        [HttpGet("historial")]
        public IActionResult ObtenerHistorial()
        {
            var historial = _context.Registros
                .Include(r => r.DatoPersonal)
                .Include(r => r.Domicilio)
                .Include(r => r.Archivo)
                .OrderByDescending(r => r.FechaRegistro)
                .Select(r => new { 
                    Id = r.Id, 
                    Folio = r.Folio, 
                    Nombre = $"{r.DatoPersonal.Nombres} {r.DatoPersonal.Apellidos}".Trim(),
                    Curp = r.DatoPersonal.Curp,
                    Domicilio = $"{r.Domicilio.Municipio}, {r.Domicilio.Estado}",
                    TienePdf = r.Archivo != null && !string.IsNullOrEmpty(r.Archivo.RutaPdf),
                    TieneTxt = r.Archivo != null && !string.IsNullOrEmpty(r.Archivo.RutaTxt)
                })
                .ToList();
                
            return Ok(historial);
        }

        private async Task<string?> GuardarArchivo(IFormFile? archivo)
        {
            if (archivo == null || archivo.Length == 0) return null;
            
            var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            if (!Directory.Exists(uploadPath)) Directory.CreateDirectory(uploadPath);

            var path = Path.Combine(uploadPath, archivo.FileName);
            using (var stream = new FileStream(path, FileMode.Create))
            {
                await archivo.CopyToAsync(stream);
            }
            return path;
        }
    }
}