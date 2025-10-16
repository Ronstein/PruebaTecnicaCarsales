import { Routes } from '@angular/router';
import { EpisodeListComponent } from './features/episodes/episode-list/episode-list.component';
import { EpisodeDetailComponent } from './features/episodes/episode-detail/episode-detail.component';

export const routes: Routes = [
  { path: 'episodes', component: EpisodeListComponent },
  { path: 'episodes/:id', component: EpisodeDetailComponent },
  { path: '', redirectTo: 'episodes', pathMatch: 'full' },
  { path: '**', redirectTo: 'episodes' },
];
