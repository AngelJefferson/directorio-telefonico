using System.ComponentModel.DataAnnotations;

namespace DirectorioExtensiones.API.Models.DTOs;

public class CreateExtensionRequest
{
    [Required(ErrorMessage = "El nombre es obligatorio")]
    public string Nombre { get; set; } = string.Empty;

    [Required(ErrorMessage = "El departamento es obligatorio")]
    public string Departamento { get; set; } = string.Empty;

    [Required(ErrorMessage = "La sede es obligatoria")]
    public string Sede { get; set; } = string.Empty;

    [Required(ErrorMessage = "El número de extensión es obligatorio")]
    public string NumeroExtension { get; set; } = string.Empty;
}
