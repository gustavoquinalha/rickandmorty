import { CharacterEpisodesCardComponent } from './../character-episodes-card/character-episodes-card.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { Character, Episode, Location } from '../../interface/characters';
import { LoadingComponent } from '../loading/loading.component';
import { CardEpisodeComponent } from '../card-episode/card-episode.component';
import { EmptyResultComponent } from '../empty-result/empty-result.component';
import { CardLocationComponent } from "../card-location/card-location.component";
import { CardCharacterDetailComponent } from "../card-character-detail/card-character-detail.component";
import { TopbarActionsComponent } from "../topbar-actions/topbar-actions.component";
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent, CardEpisodeComponent, EmptyResultComponent, CardLocationComponent, CardLocationComponent, CardCharacterDetailComponent, TopbarActionsComponent, CharacterEpisodesCardComponent, TranslateModule],
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
  providers: [RickAndMortyService]
})
export class CharacterDetailComponent implements OnInit {
  character?: Character | null;
  location?: Location;
  episodes?: Episode[];
  characterId?: string | number;
  maxCharacters = 826;

  loadingCharacter = true;
  loadingLocation = true;
  loadingEpisodes = true;
  private routeSubscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private rickAndMortyService: RickAndMortyService,
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.characterId = Number(params.get('id'));
      this.getCharacter();
    });
  }

  getCharacter() {
    this.loadingCharacter = true;
    this.rickAndMortyService.getCharacterById(this.characterId!).subscribe({
      next: (character: Character) => {
        if (character) {
          this.character = character;
          this.loadingCharacter = false;
        }
      },
      error: () => {
        this.character = null;
        this.loadingCharacter = false;
      },
    }).add(() => {
      this.getLocation(this.character?.location.url!)
      this.getEpisodes(this.character!)
    });
  }

  getLocation(url: string) {
    this.loadingLocation = true;
    this.rickAndMortyService
      .getLocation(url)
      .subscribe({
        next: (response: Location) => {
          if (response) {
            this.location = response;
            this.loadingLocation = false;
          }
        },
        error: () => {
          this.loadingLocation = false;
        },
      });
  }

  getEpisodes(character: Character) {
    this.loadingEpisodes = true;
    this.rickAndMortyService
      .getEpisodes(this.getCharactersIds(character))
      .subscribe({
        next: (response: Episode[]) => {
          if (response) {
            this.episodes = response instanceof Array ? response : [response];
            this.loadingEpisodes = false;
          }
        },
        error: () => {
          this.loadingEpisodes = false;
        },
      });
  }

  getCharactersIds(character: Character) {
    return character.episode.map((url: string) => {
      const parts = url.split('/');
      return parseInt(parts[parts.length - 1], 10);
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
