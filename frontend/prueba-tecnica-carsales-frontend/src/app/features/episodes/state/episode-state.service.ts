import { Injectable, signal, computed, inject } from "@angular/core";
import { Episode } from "../../../core/models/episode.model";
import { EpisodeService } from "../../../core/services/episode.service";

@Injectable({
  providedIn: 'root',
})

export class EpisodeStateService {
  private _episodes = signal<Episode[]>([]);
  private _page = signal(1);
  private _pageSize = signal(10);
  private _selectedEpisode = signal<Episode | null>(null);

  episodes = computed(() => this._episodes());
  page = computed(() => this._page());
  pageSize = computed(() => this._pageSize());
  selectedEpisode = computed(() => this._selectedEpisode());

  private episodeService = inject(EpisodeService);

  loadEpisodes(): void {
    this.episodeService.getEpisodes(this._page()).subscribe({
      next: (res) => this._episodes.set(res),
      error: (err) => console.error('Error loading episodes', err),
    });
  }

  loadEpisodeDetail(id: number): void {
    //  Limpia el episodio anterior para evitar mostrar datos viejos
    this._selectedEpisode.set(null);

    this.episodeService.getEpisodeDetail(id).subscribe({
      next: (res) => this._selectedEpisode.set(res),
      error: (err) => console.error('Error loading episode detail', err),
    });
  }

  nextPage(): void {
    this._page.update(p => p + 1);
    this.loadEpisodes();
  }

  prevPage(): void {
    if (this._page() > 1) {
      this._page.update(p => p - 1);
      this.loadEpisodes();
    }
  }

  goToPage(page: number): void {
    if (page >= 1) {
      this._page.set(page);
      this.loadEpisodes();
    }
  }
}
