import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private storageKey = 'favoriteItems';

  constructor() { }

  getFavorites(): number[] {
    const savedItems = localStorage.getItem(this.storageKey);
    return savedItems ? JSON.parse(savedItems) : [];
  }

  toggleFavorite(itemId: number): void {
    let favorites = this.getFavorites();

    if (favorites.includes(itemId)) {
      favorites = favorites.filter(id => id !== itemId);
    } else {
      favorites.push(itemId);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }

  isFavorite(itemId: number): boolean {
    return this.getFavorites().includes(itemId);
  }
}
