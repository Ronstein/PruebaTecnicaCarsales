import { CommonModule } from "@angular/common";
import { Component, OnInit, inject, signal } from "@angular/core";
import { RouterModule, ActivatedRoute } from "@angular/router";
import { EpisodeStateService } from "../state/episode-state.service";

@Component({
  selector: 'app-episode-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './episode-detail.component.html',
})
export class EpisodeDetailComponent {
  private route = inject(ActivatedRoute);
  episodeState = inject(EpisodeStateService);
  characterImages = signal<string[]>([]);
  loadingCharacters = signal(false);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.episodeState.loadEpisodeDetail(id);
      this.waitForEpisodeAndLoadCharacters();
    }
  }

  private async waitForEpisodeAndLoadCharacters() {
    this.loadingCharacters.set(true);

    // Espera activa hasta que haya un episodio cargado
    const checkInterval = setInterval(async () => {
      const episode = this.episodeState.selectedEpisode();
      if (episode) {
        clearInterval(checkInterval);
        await this.loadCharacterImages(episode.characters);
        this.loadingCharacters.set(false);
      }
    }, 300);
  }

  private async loadCharacterImages(characterUrls: string[]) {
    const images: string[] = [];

    // Limitamos a 10 para no sobrecargar la UI
    const urls = characterUrls.slice(0, 10);

    for (const url of urls) {
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.image) {
          images.push(data.image);
        }
      } catch (error) {
        console.error('Error al obtener imagen:', error);
      }
    }

    this.characterImages.set(images);
  }
}
