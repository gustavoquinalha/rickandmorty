import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { FavoriteService } from '../../services/favorite.service';
import { Character } from '../../interface/characters';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
  providers: [RickAndMortyService]
})
export class CharacterDetailComponent implements OnInit {
  character?: Character;
  location?: any;
  episodes?: any;
  characterId: any;
  maxCharacters = 826;

  constructor(
    private route: ActivatedRoute,
    private rickAndMortyService: RickAndMortyService,
    private router: Router,
    private favoriteService: FavoriteService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.characterId = Number(params.get('id'));
      this.rickAndMortyService.getCharacterById(this.characterId!).subscribe((character) => {
        console.log('character', character);
        this.character = character;
        this.getLocation(character?.location?.url)
        this.getEpisodes(character)
      });
    });
  }

  getLocation(url: string) {
    this.rickAndMortyService
      .getLocation(url)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.location = response;
          }
        },
        error: (_error) => {
        },
      });
  }

  getEpisodes(character: any) {
    console.log('getEpisodes', character);

    const ids = character.episode.map((url: string) => {
      const parts = url.split('/');
      return parseInt(parts[parts.length - 1], 10);
    });

    console.log('ids', ids);


    this.rickAndMortyService
      .getEpisodes(ids)
      .subscribe({
        next: (response: any) => {
          if (response) {
            console.log('response episodes', response);
            this.episodes = response;
          }
        },
        error: (_error) => {
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

  toggleFavorite(event: any, itemId: number): void {
    event.stopPropagation();
    this.favoriteService.toggleFavorite(itemId);
  }

  isFavorite(itemId: number): boolean {
    return this.favoriteService.isFavorite(itemId);
  }
}
