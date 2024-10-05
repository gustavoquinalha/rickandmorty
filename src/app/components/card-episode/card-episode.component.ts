import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RickAndMortyService } from '../../services/rick-and-morty.service';

@Component({
  selector: 'app-card-episode',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card-episode.component.html',
  styleUrl: './card-episode.component.scss'
})
export class CardEpisodeComponent {
  @Input() episode?: any;
  @Input() showInfo? = false;
  imageCharacter?: string;

  constructor(
    private rickAndMortyService: RickAndMortyService,
  ) { }

  ngOnInit() {
    console.log('episode', this.episode.characters);
    this.getFavoritesLength(this.episode.characters);
  }

  getFavoritesLength(characters: string[]) {

    const ids = characters.map((id: any) => {
      const parts = id.split('/');
      return parseInt(parts[parts.length - 1], 10);
    });

    const randomId = ids[Math.floor(Math.random() * ids.length)];

    this.rickAndMortyService.getCharacterById([randomId]).subscribe({
      next: (character: any) => {
        if (character) {
          this.imageCharacter = character.image;
        }
      }
    });
  }
}
