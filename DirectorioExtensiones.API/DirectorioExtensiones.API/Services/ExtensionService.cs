using DirectorioExtensiones.API.Data.Repositories;
using DirectorioExtensiones.API.Models.DTOs;
using DirectorioExtensiones.API.Models.Entities;

namespace DirectorioExtensiones.API.Services;

public class ExtensionService : IExtensionService
{
    private readonly IExtensionRepository _repository;

    public ExtensionService(IExtensionRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<ExtensionDto>> GetFilteredAsync(string? buscar, string? departamento, string? sede)
    {
        var extensions = await _repository.GetFilteredAsync(buscar, departamento, sede);
        return extensions.Select(MapToDto);
    }

    public async Task<ExtensionDto?> GetByIdAsync(int id)
    {
        var extension = await _repository.GetByIdAsync(id);
        return extension is null ? null : MapToDto(extension);
    }

    public async Task<ExtensionDto> CreateAsync(CreateExtensionRequest request)
    {
        var extension = new Extension
        {
            Nombre = request.Nombre.Trim(),
            Departamento = request.Departamento.Trim(),
            Sede = request.Sede.Trim(),
            NumeroExtension = request.NumeroExtension.Trim()
        };

        var created = await _repository.CreateAsync(extension);
        return MapToDto(created);
    }

    public async Task<ExtensionDto?> UpdateAsync(int id, UpdateExtensionRequest request)
    {
        var extension = new Extension
        {
            Nombre = request.Nombre.Trim(),
            Departamento = request.Departamento.Trim(),
            Sede = request.Sede.Trim(),
            NumeroExtension = request.NumeroExtension.Trim()
        };

        var updated = await _repository.UpdateAsync(id, extension);
        return updated is null ? null : MapToDto(updated);
    }

    private static ExtensionDto MapToDto(Extension e) => new(
        e.Id, e.Nombre, e.Departamento, e.Sede, e.NumeroExtension
    );
}
