var builder = WebApplication.CreateBuilder(args);

// 1. Agregar soporte para Controladores
builder.Services.AddControllers();

// 2. Habilitar CORS para React (Vite en puerto 5173)
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://127.0.0.1:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// 3. Aplicar CORS
app.UseCors("PermitirFrontend");

// 4. Mapear las rutas hacia tu carpeta Controllers
app.MapControllers();

app.Run();