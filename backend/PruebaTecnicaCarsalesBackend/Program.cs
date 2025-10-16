using PruebaTecnicaCarsalesBackend.Config;
using PruebaTecnicaCarsalesBackend.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDev", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // origen del frontend Angular
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


// Configuración de APIs externas
builder.Services.Configure<ExternalApisSettings>(
    builder.Configuration.GetSection("ExternalApis")
);

// Servicios
builder.Services.AddHttpClient<EpisodeService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowAngularDev");

// Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
