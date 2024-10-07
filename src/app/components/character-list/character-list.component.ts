import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { Character, ApiResponse } from '../../interface/characters';
import { FavoriteService } from '../../services/favorite.service';
import { CardCharacterComponent } from '../card-character/card-character.component';
import { LoadingComponent } from "../loading/loading.component";
import { FilterListComponent } from "../filter-list/filter-list.component";
import { EmptyResultComponent } from '../empty-result/empty-result.component';
import { FilterService } from '../../services/filter.service';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CardCharacterComponent, LoadingComponent, FilterListComponent, EmptyResultComponent, TranslateModule],
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
  providers: [RickAndMortyService]
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];
  filteredCharacters: Character[] = [];
  favoriteItems: Character[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  searchTerm: string = '';
  selectedSpecies: string = '';
  selectedGender: string = '';
  selectedStatus: string = '';
  loadingCharacters = true;
  pagesArray: number[] = [];
  showFavorites = false;
  showGrid = true;
  private filterSubscription?: Subscription;

  constructor(private rickAndMortyService: RickAndMortyService, private favoriteService: FavoriteService, private filterService: FilterService) { }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 64 && !this.loadingCharacters) {
      this.loadMore();
    }
  }

  ngOnInit(): void {
    this.fetchCharacters(this.currentPage);

    this.filterSubscription = this.filterService.filter$.subscribe((filter) => {
      this.applyFilter(filter);
    });
  }

  applyFilter(filter: any) {
    this.showFavorites = filter.favorite;
    this.fetchCharacters(1, filter.search, filter.specie, filter.gender, filter.status, false);

  }

  fetchCharacters(page: number, name: string = '', specie: string = '', gender: string = '', status: string = '', append: boolean = false): void {
    this.loadingCharacters = true;

    this.rickAndMortyService
      .getCharacters(page, name, specie, gender, status, this.verifyFavorites())
      .subscribe({
        next: (response: ApiResponse) => {
          if (response) {
            this.validateResponse(response, append);
            this.setConfigs(response?.info?.pages ?? 1, page);
          }
        },
        error: () => {
          this.filteredCharacters = [];
          this.loadingCharacters = false;
        },
      });
  }

  verifyFavorites(): number[] | object[] {
    const favoritesList = this.favoriteService.getFavorites();
    return this.showFavorites
      ? favoritesList.length ? favoritesList : [{}]
      : [];
  }

  validateResponse(response: ApiResponse, append: boolean) {
    if (append) {
      this.filteredCharacters = [...this.filteredCharacters, ...response.results];
    } else {
      this.filteredCharacters = response.results || (Array.isArray(response) ? response : [response]);
    }
    this.characters = this.filteredCharacters;
    this.loadingCharacters = false;
  }

  setConfigs(pages: number, page: number): void {
    this.totalPages = pages;
    this.currentPage = page;
    this.pagesArray = Array.from(
      { length: this.totalPages },
      (_, index) => index + 1
    );
  }

  loadMore(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchCharacters(
        this.currentPage,
        this.searchTerm,
        this.selectedSpecies,
        this.selectedGender,
        this.selectedStatus,
        true
      );
    }
  }


  get getFavoritesLength() {
    return this.favoriteService.getFavorites().length
  }

  ngOnDestroy() {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }
}
