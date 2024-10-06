import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-card-character-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card-character-detail.component.html',
  styleUrl: './card-character-detail.component.scss'
})
export class CardCharacterDetailComponent {
  @Input() character?: any;
  constructor(private favoriteService: FavoriteService) { }

  toggleFavorite(event: any, itemId: number): void {
    event.stopPropagation();
    event.preventDefault();
    this.favoriteService.toggleFavorite(itemId);
  }

  isFavorite(itemId: number): boolean {
    return this.favoriteService.isFavorite(itemId);
  }
}
