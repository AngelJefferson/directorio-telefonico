using Microsoft.AspNetCore.Mvc;
using DirectorioExtensiones.API.Models.DTOs;
using DirectorioExtensiones.API.Services;

namespace DirectorioExtensiones.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExtensionesController : ControllerBase
{
    private readonly IExtensionService _extensionService;

    public ExtensionesController(IExtensionService extensionService)
    {
        _extensionService = extensionService;
    }

    [HttpGet]
    public async Task<IActionResult> ObtenerExtensiones(
        [FromQuery] string? buscar,
        [FromQuery] string? departamento,
        [FromQuery] string? sede)
    {
        var resultado = await _extensionService.GetFilteredAsync(buscar, departamento, sede);
        return Ok(resultado);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> ObtenerExtensionPorId(int id)
    {
        var extension = await _extensionService.GetByIdAsync(id);
        if (extension is null)
            return NotFound(new { error = "Extensión no encontrada" });
        return Ok(extension);
    }

    [HttpPost]
    public async Task<IActionResult> CrearExtension([FromBody] CreateExtensionRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var created = await _extensionService.CreateAsync(request);
        return CreatedAtAction(nameof(ObtenerExtensionPorId), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> ActualizarExtension(int id, [FromBody] UpdateExtensionRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var updated = await _extensionService.UpdateAsync(id, request);
        if (updated is null)
            return NotFound(new { error = "Extensión no encontrada" });

        return Ok(updated);
    }
}
