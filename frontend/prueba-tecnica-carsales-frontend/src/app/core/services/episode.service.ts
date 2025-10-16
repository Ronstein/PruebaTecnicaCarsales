import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Episode } from "../models/episode.model";
import { EpisodeRepository } from "../repositories/episode.repository";

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  constructor(private repository: EpisodeRepository) { }

  getEpisodes(page: number = 1): Observable<Episode[]> {
    return this.repository.getEpisodes(page);
  }

  getEpisodeDetail(id: number): Observable<Episode> {
    return this.repository.getEpisodeById(id);
  }
}
