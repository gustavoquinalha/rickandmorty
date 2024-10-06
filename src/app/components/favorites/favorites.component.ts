import { RickAndMortyService } from './../../services/rick-and-morty.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { FavoriteService } from '../../services/favorite.service';
import { CardCharacterComponent } from '../card-character/card-character.component';
import { LoadingComponent } from '../loading/loading.component';
import { EmptyResultComponent } from '../empty-result/empty-result.component';
import { Character } from '../../interface/characters';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, CardCharacterComponent, LoadingComponent, EmptyResultComponent],
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {
  favoriteItems: Character[] = [];
  loadingFavorites = true;

  constructor(private favoriteService: FavoriteService, private rickAndMortyService: RickAndMortyService) { }

  ngOnInit(): void {
    this.loadFavoriteItems();
  }

  loadFavoriteItems(): void {
    const favoriteIds = this.favoriteService.getFavorites();

    if (!favoriteIds.length) {
      this.favoriteItems = [];
      return;
    };

    this.filterFavorites(favoriteIds);
  }

  filterFavorites(favoriteIds: number[]) {
    const requests = favoriteIds.map(id => this.rickAndMortyService.getCharacterById(id.toString()));
    this.loadingFavorites = true;
    forkJoin(requests).subscribe({
      next: (characters: Character[]) => {
        this.favoriteItems = characters;
        this.loadingFavorites = false;
      },
      error: (_err) => {
        this.favoriteItems = [];
        this.loadingFavorites = false;
      }
    });
  }

  get getFavoritesLength() {
    return this.favoriteService.getFavorites().length
  }
}
