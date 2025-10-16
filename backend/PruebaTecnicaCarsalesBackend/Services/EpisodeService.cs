using PruebaTecnicaCarsalesBackend.Config;
using PruebaTecnicaCarsalesBackend.Models;
using Microsoft.Extensions.Options;
using System.Net.Http.Json;

namespace PruebaTecnicaCarsalesBackend.Services;

public class EpisodeService
{
    private readonly HttpClient _httpClient;
    private readonly string _episodesApiBaseUrl;

    public EpisodeService(HttpClient httpClient, IOptions<ExternalApisSettings> options)
    {
        _httpClient = httpClient;
        _episodesApiBaseUrl = options.Value.EpisodesApiBaseUrl;
    }

    public async Task<List<EpisodeDto>> GetEpisodesAsync(int page = 1)
    {
        try
        {
            var response = await _httpClient.GetFromJsonAsync<EpisodeResponse>($"{_episodesApiBaseUrl}?page={page}");
            return response?.Results ?? new List<EpisodeDto>();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching episodes: {ex.Message}");
            return new List<EpisodeDto>();
        }
    }

    public async Task<EpisodeDto?> GetEpisodeByIdAsync(int id)
    {
        try
        {
            var episode = await _httpClient.GetFromJsonAsync<EpisodeDto>($"{_episodesApiBaseUrl}/{id}");
            return episode;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching episode by ID: {ex.Message}");
            return null;
        }
    }

    private class ApiResponse
    {
        public List<EpisodeDto> Results { get; set; } = new();
    }
}
