import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private storageKey = 'favoriteItems';

  constructor() { }

  // Obter a lista de itens salvos
  getFavorites(): number[] {
    const savedItems = localStorage.getItem(this.storageKey);
    return savedItems ? JSON.parse(savedItems) : [];
  }

  // Adicionar ou remover um item
  toggleFavorite(itemId: number): void {
    let favorites = this.getFavorites();

    if (favorites.includes(itemId)) {
      // Remover o item se já estiver salvo
      favorites = favorites.filter(id => id !== itemId);
    } else {
      // Adicionar o item se não estiver salvo
      favorites.push(itemId);
    }

    // Atualizar o localStorage
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }

  // Verificar se o item está favoritado
  isFavorite(itemId: number): boolean {
    return this.getFavorites().includes(itemId);
  }
}
