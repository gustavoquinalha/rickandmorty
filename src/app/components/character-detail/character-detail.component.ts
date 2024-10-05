import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { FavoriteService } from '../../services/favorite.service';
import { Character } from '../../interface/characters';
import { LoadingComponent } from '../loading/loading.component';
import { CardEpisodeComponent } from '../card-episode/card-episode.component';
import { EmptyResultComponent } from '../empty-result/empty-result.component';
import { CardLocationComponent } from "../card-location/card-location.component";
import { CardCharacterDetailComponent } from "../card-character-detail/card-character-detail.component";

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent, CardEpisodeComponent, EmptyResultComponent, CardLocationComponent, CardLocationComponent, CardCharacterDetailComponent],
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
  providers: [RickAndMortyService]
})
export class CharacterDetailComponent implements OnInit {
  character?: Character | null;
  location?: any;
  episodes?: any;
  characterId: any;
  maxCharacters = 826;

  loadingCharacter = true;
  loadingLocation = true;
  loadingEpisodes = true;

  constructor(
    private route: ActivatedRoute,
    private rickAndMortyService: RickAndMortyService,
    private router: Router,
    private favoriteService: FavoriteService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.characterId = Number(params.get('id'));
      this.loadingCharacter = true;
      this.rickAndMortyService.getCharacterById(this.characterId!).subscribe({
        next: (character: any) => {
          if (character) {
            this.character = character;
            this.getLocation(character?.location?.url)
            this.getEpisodes(character)
            this.loadingCharacter = false;
          }
        },
        error: (_err) => {
          this.character = null;
          this.loadingCharacter = false;
          this.loadingLocation = false;
          this.loadingEpisodes = false;
        },
      });
    });
  }

  getLocation(url: string) {
    this.loadingLocation = true;
    this.rickAndMortyService
      .getLocation(url)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.location = response;
            this.loadingLocation = false;
          }
        },
        error: (_err) => {
          this.loadingLocation = false;
        },
      });
  }

  getEpisodes(character: any) {
    this.loadingEpisodes = true;

    const ids = character.episode.map((url: string) => {
      const parts = url.split('/');
      return parseInt(parts[parts.length - 1], 10);
    });

    this.rickAndMortyService
      .getEpisodes(ids)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.episodes = response instanceof Array ? response : [response];
            this.loadingEpisodes = false;
          }
        },
        error: (_err) => {
          this.loadingEpisodes = false;
        },
      });
  }

  formatDate(isoString: string): string {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  goToPreviousCharacter() {
    if (this.characterId > 1) {
      this.router.navigate(['/character', Number(this.characterId) - 1]);
    }
  }

  goToNextCharacter() {
    if (this.characterId < this.maxCharacters) {
      this.router.navigate(['/character', Number(this.characterId) + 1]);
    }
  }

  toggleFavorite(event: Event, itemId: number): void {
    event.stopPropagation();
    event.preventDefault();
    this.favoriteService.toggleFavorite(itemId);
  }

  isFavorite(itemId: number): boolean {
    return this.favoriteService.isFavorite(itemId);
  }
}
