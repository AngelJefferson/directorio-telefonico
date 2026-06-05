namespace DirectorioExtensiones.API.Models.DTOs;

public record ExtensionDto(
    int Id,
    string Nombre,
    string Departamento,
    string Sede,
    string NumeroExtension
);
