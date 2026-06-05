namespace DirectorioExtensiones.API.Models.Entities;

public class Extension
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Departamento { get; set; } = string.Empty;
    public string Sede { get; set; } = string.Empty;
    public string NumeroExtension { get; set; } = string.Empty;
}
