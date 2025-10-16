import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { EpisodeStateService } from "../state/episode-state.service";
import { EpisodeFilterPipe } from "../../../pipes/episode-filter.pipe";

@Component({
  selector: 'app-episode-list',
  imports: [CommonModule, RouterModule, EpisodeFilterPipe],
  templateUrl: './episode-list.component.html',
})
export class EpisodeListComponent {
  private router = inject(Router);
  episodeState = inject(EpisodeStateService);
  searchQuery = signal('');

  // Cargar episodios al crear el componente
  constructor() {
    this.episodeState.loadEpisodes();
  }

  nextPage() {
    this.episodeState.nextPage();
  }

  prevPage() {
    this.episodeState.prevPage();
  }
}
