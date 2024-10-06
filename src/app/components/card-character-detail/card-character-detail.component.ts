import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FavoriteService } from '../../services/favorite.service';
import { Character } from '../../interface/characters';

@Component({
  selector: 'app-card-character-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card-character-detail.component.html',
  styleUrl: './card-character-detail.component.scss'
})
export class CardCharacterDetailComponent {
  @Input() character?: Character;
  constructor(private favoriteService: FavoriteService) { }

  toggleFavorite(event: Event, itemId: number): void {
    event.stopPropagation();
    event.preventDefault();
    this.favoriteService.toggleFavorite(itemId);
  }

  isFavorite(itemId: number): boolean {
    return this.favoriteService.isFavorite(itemId);
  }
}
