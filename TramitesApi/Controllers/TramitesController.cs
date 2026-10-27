using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;
using TramitesApi.Models;


[ApiController]
[Route("api/[controller]")]
public class TramitesController : ControllerBase
{
    // POST: api/tramites
    [HttpPost]
    public async Task<IActionResult> CrearTramite([FromForm] TramiteDTO request)
    {
        // 1. Generar Folio Único (TR-XXXXX hasta 5 dígitos)
        Random random = new Random();
        int numeroFolio = random.Next(1, 99999);
        string folioUnico = $"TR-{numeroFolio:D5}";

        // 2. Guardar archivos (PDF y TXT)
        string? pathPdf = await GuardarArchivo(request.ArchivoPdf);
        string? pathTxt = await GuardarArchivo(request.ArchivoTxt);

        // 3. Guardar en Base de Datos (Lógica simulada de Entity Framework/Dapper)
        /* 
         var nuevoRegistro = new Registro {
             Folio = folioUnico,
             Nombre = request.Nombre,
             IngresoMensual = request.IngresoMensual,
             Estado = request.Estado,
             RutaPdf = pathPdf,
             RutaTxt = pathTxt
         };
         _context.Registros.Add(nuevoRegistro);
         await _context.SaveChangesAsync();
        */

        // 4. Retornar el folio para el Modal del Frontend
        return Ok(new { Folio = folioUnico });
    }

    // GET: api/tramites/historial
    [HttpGet("historial")]
    public IActionResult ObtenerHistorial()
    {
        // Simulación de consulta a BD
        var historial = new[] {
            new { Folio = "TR-00124", Nombre = "Juan Pérez", Estado = "CDMX" },
            new { Folio = "TR-00125", Nombre = "María López", Estado = "Jalisco" }
        };
        return Ok(historial);
    }

    private async Task<string?> GuardarArchivo(IFormFile archivo)
    {
        if (archivo == null || archivo.Length == 0) return null;
        var path = Path.Combine("Uploads", archivo.FileName);
        using (var stream = new FileStream(path, FileMode.Create))
        {
            await archivo.CopyToAsync(stream);
        }
        return path;
    }
}