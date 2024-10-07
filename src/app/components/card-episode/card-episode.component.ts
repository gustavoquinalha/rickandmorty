import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { Character, Episode } from '../../interface/characters';

@Component({
  selector: 'app-card-episode',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card-episode.component.html',
  styleUrl: './card-episode.component.scss'
})
export class CardEpisodeComponent {
  @Input() episode?: Episode;
  @Input() showInfo? = false;
  imageCharacter?: string;

  constructor(
    private rickAndMortyService: RickAndMortyService,
  ) { }

  ngOnInit() {
    this.getFavoritesLength(this.episode?.characters!);
  }

  getFavoritesLength(characters: string[]) {
    console.log('getFavoritesLength', characters);

    this.rickAndMortyService.getCharacterById([this.generateRandomId(characters)]).subscribe({
      next: (character: Character) => {
        if (character) {
          this.imageCharacter = character.image;
        }
      }, error: () => {
        this.imageCharacter = '';
      },
    });
  }

  generateRandomId(characters: string[]): number {
    const ids = this.getIds(characters);
    return ids[Math.floor(Math.random() * ids.length)];
  }

  getIds(characters: string[]): number[] {
    return characters.map((id: string) => {
      const parts = id.split('/');
      return parseInt(parts[parts.length - 1], 10);
    });
  }
}
