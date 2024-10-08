import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { CommonModule } from '@angular/common';
import { Character, Episode } from '../../interface/characters';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarCharactersComponent } from '../../components/avatar-characters/avatar-characters.component';
import { CardEpisodeComponent } from '../../components/card-episode/card-episode.component';
import { EmptyResultComponent } from '../../components/empty-result/empty-result.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { TopbarActionsComponent } from '../../components/topbar-actions/topbar-actions.component';

@Component({
  selector: 'app-episode',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent, AvatarCharactersComponent, EmptyResultComponent, CardEpisodeComponent, TopbarActionsComponent, TranslateModule],
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
  private routeSubscription: Subscription = new Subscription();
  constructor(
    private route: ActivatedRoute,
    private rickAndMortyService: RickAndMortyService,
  ) { }
  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.episodeId = Number(params.get('id'));
      this.getEpisodeById();
    });
  }

  getEpisodeById() {
    this.loadingEpisode = true;
    this.rickAndMortyService.getEpisodeById(this.episodeId!).subscribe({
      next: (episode: Episode) => {
        this.episode = episode;
        this.loadingEpisode = false;
      },
      error: () => {
        this.loadingEpisode = false;
      }
    }).add(() => {
      this.getCharacters(this.episode?.characters!);
    });
  }

  getCharacters(residents: string[]) {
    this.loadingCharacter = true;
    this.rickAndMortyService.getCharacterById(this.getIds(residents)).subscribe({
      next: (character: Character[]) => {
        if (character) {
          this.character = character;
          this.loadingCharacter = false;
        }
      },
      error: () => {
        this.loadingCharacter = false;
      },
    });
  }

  getIds(residents: string[]) {
    return residents.map((id: string) => {
      const parts = id.split('/');
      return parseInt(parts[parts.length - 1], 10);
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
