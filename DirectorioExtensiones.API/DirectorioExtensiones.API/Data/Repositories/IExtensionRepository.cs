using DirectorioExtensiones.API.Models.Entities;

namespace DirectorioExtensiones.API.Data.Repositories;

public interface IExtensionRepository
{
    Task<IEnumerable<Extension>> GetFilteredAsync(string? buscar, string? departamento, string? sede);
    Task<Extension?> GetByIdAsync(int id);
    Task<Extension> CreateAsync(Extension extension);
    Task<Extension?> UpdateAsync(int id, Extension extension);
}
