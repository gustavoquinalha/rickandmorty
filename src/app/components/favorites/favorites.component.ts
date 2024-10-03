import { RickAndMortyService } from './../../services/rick-and-morty.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { FavoriteService } from '../../services/favorite.service';
import { CardCharacterComponent } from '../card-character/card-character.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, CardCharacterComponent],
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {
  favoriteItems: any[] = [];

  constructor(private favoriteService: FavoriteService, private rickAndMortyService: RickAndMortyService) { }

  ngOnInit(): void {
    this.loadFavoriteItems();
  }

  loadFavoriteItems(): void {
    const favoriteIds = this.favoriteService.getFavorites();
    const requests = favoriteIds.map(id => this.rickAndMortyService.getCharacterById(id.toString()));

    forkJoin(requests).subscribe({
      next: (characters) => {
        this.favoriteItems = characters;
      },
      error: (err) => {
        console.error('Erro ao buscar personagens:', err);
      }
    });
  }
}
