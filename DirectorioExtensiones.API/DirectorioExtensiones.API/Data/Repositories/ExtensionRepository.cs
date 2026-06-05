using Microsoft.EntityFrameworkCore;
using DirectorioExtensiones.API.Models.Entities;

namespace DirectorioExtensiones.API.Data.Repositories;

public class ExtensionRepository : IExtensionRepository
{
    private readonly AppDbContext _context;

    public ExtensionRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Extension>> GetFilteredAsync(string? buscar, string? departamento, string? sede)
    {
        IQueryable<Extension> query;

        if (!string.IsNullOrWhiteSpace(buscar))
        {
            var pattern = $"%{buscar}%";
            query = _context.Extensiones.FromSql(
                $@"SELECT * FROM extensiones WHERE
                   translate(LOWER(nombre), 'áéíóúüñ', 'aeioun') LIKE translate(LOWER({pattern}), 'áéíóúüñ', 'aeioun')
                   OR translate(LOWER(numeroextension), 'áéíóúüñ', 'aeioun') LIKE translate(LOWER({pattern}), 'áéíóúüñ', 'aeioun')
                   OR translate(LOWER(departamento), 'áéíóúüñ', 'aeioun') LIKE translate(LOWER({pattern}), 'áéíóúüñ', 'aeioun')");
        }
        else
        {
            query = _context.Extensiones;
        }

        if (!string.IsNullOrWhiteSpace(departamento))
            query = query.Where(e => e.Departamento == departamento);

        if (!string.IsNullOrWhiteSpace(sede))
            query = query.Where(e => e.Sede == sede);

        return await query.ToListAsync();
    }

    public async Task<Extension?> GetByIdAsync(int id)
    {
        return await _context.Extensiones.FindAsync(id);
    }

    public async Task<Extension> CreateAsync(Extension extension)
    {
        _context.Extensiones.Add(extension);
        await _context.SaveChangesAsync();
        return extension;
    }

    public async Task<Extension?> UpdateAsync(int id, Extension updated)
    {
        var existing = await _context.Extensiones.FindAsync(id);
        if (existing is null) return null;

        existing.Nombre = updated.Nombre;
        existing.Departamento = updated.Departamento;
        existing.Sede = updated.Sede;
        existing.NumeroExtension = updated.NumeroExtension;

        await _context.SaveChangesAsync();
        return existing;
    }
}
