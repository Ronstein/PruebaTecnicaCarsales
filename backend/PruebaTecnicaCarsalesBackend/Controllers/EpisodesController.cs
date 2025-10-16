using PruebaTecnicaCarsalesBackend.Models;
using PruebaTecnicaCarsalesBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace PruebaTecnicaCarsalesBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EpisodesController : ControllerBase
{
    private readonly EpisodeService _episodeService;

    public EpisodesController(EpisodeService episodeService)
    {
        _episodeService = episodeService;
    }

    /// <summary>
    /// Obtener lista de episodios con paginación
    /// </summary>
    /// <param name="page">Número de página (default 1)</param>
    /// <returns>Lista de episodios</returns>
    [HttpGet]
    public async Task<ActionResult<List<EpisodeDto>>> Get([FromQuery] int page = 1)
    {
        var episodes = await _episodeService.GetEpisodesAsync(page);
        return Ok(episodes);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<EpisodeDto>> GetEpisodeById(int id)
    {
        var episode = await _episodeService.GetEpisodeByIdAsync(id);

        if (episode == null)
            return NotFound();

        return Ok(episode);
    }
}
