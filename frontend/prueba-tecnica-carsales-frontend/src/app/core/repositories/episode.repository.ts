import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { Episode } from "../models/episode.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EpisodeRepository {
  private apiUrl = `${environment.apiUrl}/episodes`;

  constructor(private http: HttpClient) { }

  getEpisodes(page: number): Observable<Episode[]> {
    return this.http.get<Episode[]>(`${this.apiUrl}?page=${page}`)
      .pipe(catchError(err => {
        console.error('Error en EpisodeRepository:', err);
        return throwError(() => err);
      }));
  }

  getEpisodeById(id: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.apiUrl}/${id}`)
      .pipe(catchError(err => {
        console.error('Error en EpisodeRepository:', err);
        return throwError(() => err);
      }));
  }
}
