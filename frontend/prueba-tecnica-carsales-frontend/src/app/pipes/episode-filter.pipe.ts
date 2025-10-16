import { Pipe, PipeTransform } from '@angular/core';
import { Episode } from '../core/models/episode.model';

@Pipe({
  name: 'episodeFilter'
})

export class EpisodeFilterPipe implements PipeTransform {
  transform(value: Episode[], search: string): Episode[] {
    if (!search) return value;

    search = search.toLowerCase();

    return value.filter(
      episode => episode.name.toLowerCase().includes(search)
    );
  }
}
