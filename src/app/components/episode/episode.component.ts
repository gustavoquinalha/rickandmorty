import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { Character, Episode } from '../../interface/characters';
import { AvatarCharactersComponent } from '../avatar-characters/avatar-characters.component';
import { EmptyResultComponent } from '../empty-result/empty-result.component';
import { CardEpisodeComponent } from "../card-episode/card-episode.component";
import { TopbarActionsComponent } from '../topbar-actions/topbar-actions.component';

@Component({
  selector: 'app-episode',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent, AvatarCharactersComponent, EmptyResultComponent, CardEpisodeComponent, TopbarActionsComponent],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.scss'
})
export class EpisodeComponent {
  episodeId: number = 0;
  episode?: Episode;
  maxEpisode = 51;
  loadingEpisode = true;
  loadingCharacter = true;
  character?: Character[];
  constructor(
    private route: ActivatedRoute,
    private rickAndMortyService: RickAndMortyService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.loadingEpisode = true;
      this.episodeId = Number(params.get('id'));
      this.rickAndMortyService.getEpisodeById(this.episodeId!).subscribe({
        next: (episode: Episode) => {
          this.episode = episode;
          this.loadingEpisode = false;

          this.getCharacters(episode.characters);
        },
        error: (_err) => {
          this.loadingEpisode = false;
          this.loadingCharacter = false;
        }
      });
    });
  }

  getCharacters(residents: string[]) {
    this.loadingCharacter = true;

    const ids = residents.map((id: string) => {
      const parts = id.split('/');
      return parseInt(parts[parts.length - 1], 10);
    });

    this.rickAndMortyService.getCharacterById(ids).subscribe({
      next: (character: Character[]) => {
        if (character) {
          this.character = character;
          this.loadingCharacter = false;
        }
      },
      error: (_err) => {
        this.loadingCharacter = false;
      },
    });
  }

  goToPreviousEpisode() {
    if (this.episodeId > 1) {
      this.router.navigate(['/episode', Number(this.episodeId) - 1]);
    }
  }

  goToNextEpisode() {
    if (this.episodeId < this.maxEpisode) {
      this.router.navigate(['/episode', Number(this.episodeId) + 1]);
    }
  }

}
