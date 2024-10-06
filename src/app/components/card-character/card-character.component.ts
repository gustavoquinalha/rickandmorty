import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FavoriteService } from '../../services/favorite.service';
import { Character } from '../../interface/characters';
import { FilterService } from '../../services/filter.service';

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
  @Input() showFavorites?: boolean;

  constructor(private favoriteService: FavoriteService, private filterService: FilterService) { }

  toggleFavorite(event: Event, itemId: number): void {
    event.stopPropagation();
    event.preventDefault();
    this.favoriteService.toggleFavorite(itemId);
    this.updateFilter();
  }

  updateFilter() {
    if (this.showFavorites) {
      this.filterService.updateFilter({
        favorite: true,
        search: '',
        gender: '',
        specie: '',
        status: '',
      });
    }
  }

  isFavorite(itemId: number): boolean {
    return this.favoriteService.isFavorite(itemId);
  }
}
