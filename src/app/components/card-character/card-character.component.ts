import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FavoriteService } from '../../services/favorite.service';
import { Character } from '../../interface/characters';

@Component({
  selector: 'app-card-character',
  templateUrl: './card-character.component.html',
  styleUrls: ['./card-character.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class CardCharacterComponent {
  @Input() character?: Character;

  constructor(private favoriteService: FavoriteService) { }

  toggleFavorite(event: any, itemId: number): void {
    event.stopPropagation();
    this.favoriteService.toggleFavorite(itemId);
  }

  isFavorite(itemId: number): boolean {
    return this.favoriteService.isFavorite(itemId);
  }
}
