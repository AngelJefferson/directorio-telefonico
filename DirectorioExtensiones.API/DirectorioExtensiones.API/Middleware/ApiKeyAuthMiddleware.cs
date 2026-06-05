namespace DirectorioExtensiones.API.Middleware;

public class ApiKeyAuthMiddleware
{
    private readonly RequestDelegate _next;
    private const string API_KEY_HEADER = "X-Api-Key";

    public ApiKeyAuthMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context, IConfiguration configuration)
    {
        var apiKey = configuration["ApiKey"];

        if (!string.IsNullOrEmpty(apiKey))
        {
            if (!context.Request.Headers.TryGetValue(API_KEY_HEADER, out var providedKey) || providedKey != apiKey)
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsJsonAsync(new { error = "API Key no válida o ausente" });
                return;
            }
        }

        await _next(context);
    }
}
