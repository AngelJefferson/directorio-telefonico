using DirectorioExtensiones.API.Models.DTOs;

namespace DirectorioExtensiones.API.Services;

public interface IExtensionService
{
    Task<IEnumerable<ExtensionDto>> GetFilteredAsync(string? buscar, string? departamento, string? sede);
    Task<ExtensionDto?> GetByIdAsync(int id);
    Task<ExtensionDto> CreateAsync(CreateExtensionRequest request);
    Task<ExtensionDto?> UpdateAsync(int id, UpdateExtensionRequest request);
}
