using Microsoft.EntityFrameworkCore;
using DirectorioExtensiones.API.Data;
using DirectorioExtensiones.API.Data.Repositories;
using DirectorioExtensiones.API.Services;
using DirectorioExtensiones.API.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresConnection")));

builder.Services.AddScoped<IExtensionRepository, ExtensionRepository>();
builder.Services.AddScoped<IExtensionService, ExtensionService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Desarrollo", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:4173")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });

    options.AddPolicy("Produccion", policy =>
    {
        policy.WithOrigins(builder.Configuration.GetSection("AllowedOrigins").Get<string[]>() ?? [])
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseMiddleware<ErrorHandlingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("Desarrollo");
}
else
{
    app.UseCors("Produccion");
}

app.UseHttpsRedirection();
app.UseMiddleware<ApiKeyAuthMiddleware>();
app.UseAuthorization();
app.MapControllers();

app.Run();
