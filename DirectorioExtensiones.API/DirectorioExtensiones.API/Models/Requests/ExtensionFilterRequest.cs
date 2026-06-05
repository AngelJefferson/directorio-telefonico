namespace DirectorioExtensiones.API.Models.Requests;

public record ExtensionFilterRequest(
    string? Buscar,
    string? Departamento,
    string? Sede
);
