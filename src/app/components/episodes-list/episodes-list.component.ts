import { Component } from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { CardEpisodeComponent } from "../card-episode/card-episode.component";
import { EmptyResultComponent } from '../empty-result/empty-result.component';

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent, CardEpisodeComponent, EmptyResultComponent],
  templateUrl: './episodes-list.component.html',
  styleUrl: './episodes-list.component.scss'
})
export class EpisodesListComponent {
  episodes?: any;
  loadingEpisodes = true;
  count = 0;
  pages = 1;

  constructor(private rickAndMortyService: RickAndMortyService,) { }

  ngOnInit(): void {
    console.log('getEpisodes');
    this.getEpisodes();
  }

  getEpisodes() {
    this.loadingEpisodes = true;

    this.rickAndMortyService
      .getEpisodes([])
      .subscribe({
        next: (response: any) => {
          console.log('response', response);

          if (response) {

            this.count = response.info.count;
            this.pages = response.info.pages;

            this.episodes = response.results;
            this.loadingEpisodes = false;
          }
        },
        error: (_err) => {
          this.loadingEpisodes = false;
        },
      });
  }
}
