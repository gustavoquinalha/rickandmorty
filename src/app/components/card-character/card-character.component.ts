import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() showGrid?: boolean;
  @Output() favoriteChange = new EventEmitter<number>();

  constructor(private favoriteService: FavoriteService) { }

  toggleFavorite(event: Event, itemId: number): void {
    event.stopPropagation();
    event.preventDefault();
    this.favoriteService.toggleFavorite(itemId);
    this.favoriteChange.emit(itemId);
  }

  isFavorite(itemId: number): boolean {
    return this.favoriteService.isFavorite(itemId);
  }
}
