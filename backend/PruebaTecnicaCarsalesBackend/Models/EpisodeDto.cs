using System.Text.Json.Serialization;

namespace PruebaTecnicaCarsalesBackend.Models;

public class EpisodeResponse
{
    public Info Info { get; set; } = new();
    public List<EpisodeDto> Results { get; set; } = new();
}

public class Info
{
    public int Count { get; set; }
    public int Pages { get; set; }
    public string? Next { get; set; }
    public string? Prev { get; set; }
}

public class EpisodeDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("air_date")]
    public string AirDate { get; set; } = string.Empty;

    public string Episode { get; set; } = string.Empty;

    public List<string> Characters { get; set; } = new List<string>();

    public string Url { get; set; } = string.Empty;

    public DateTime Created { get; set; }
}
