import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { ApiResponse, Episode } from '../../interface/characters';
import { TranslateModule } from '@ngx-translate/core';
import { CardEpisodeComponent } from '../../components/card-episode/card-episode.component';
import { EmptyResultComponent } from '../../components/empty-result/empty-result.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent, CardEpisodeComponent, EmptyResultComponent, TranslateModule],
  templateUrl: './episodes-list.component.html',
  styleUrl: './episodes-list.component.scss'
})
export class EpisodesListComponent {
  episodes = new BehaviorSubject<Episode[]>([]);
  loadingEpisodes = true;

  constructor(private rickAndMortyService: RickAndMortyService,) { }

  ngOnInit(): void {
    this.getEpisodes();
  }

  getEpisodes() {
    this.loadingEpisodes = true;

    this.rickAndMortyService
      .getEpisodes([])
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.episodes.next(response.results);
            this.loadingEpisodes = false;
          }
        },
        error: () => {
          this.episodes.next([]);
          this.loadingEpisodes = false;
        },
      });
  }

  trackByEpisode(_index: number, episode: Episode): number {
    return episode.id;
  }
}
