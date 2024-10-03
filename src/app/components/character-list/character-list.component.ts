import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Importar FormsModule
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { Character, ApiResponse } from '../../interface/characters';
import { FavoriteService } from '../../services/favorite.service';
import { CardCharacterComponent } from '../card-character/card-character.component';
import { forkJoin } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CardCharacterComponent],
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

  constructor(private rickAndMortyService: RickAndMortyService, private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.fetchCharacters(this.currentPage);
  }

  fetchCharacters(page: number, name: string = '', specie: string = '', gender: string = '', status: string = '', append: boolean = false): void {
    this.loadingCharacters = true;

    const favorites: number[] = this.showFavorites
      ? this.favoriteService.getFavorites()
      : [];

    this.rickAndMortyService
      .getCharacters(page, name, specie, gender, status, favorites)
      .subscribe({
        next: (response: ApiResponse) => {

          console.log('response', response);


          if (response) {
            this.filteredCharacters = append
              ? [...this.filteredCharacters, ...response.results]
              : response.results ? response.results : response instanceof Array ? (response as any) : [response];
            this.characters = this.filteredCharacters;
            this.totalPages = response?.info?.pages ?? 1;
            this.currentPage = page;
            this.pagesArray = Array.from(
              { length: this.totalPages },
              (_, i) => i + 1
            );
            this.loadingCharacters = false;
          }
        },
        error: (_error) => {
          this.filteredCharacters = [];
          this.loadingCharacters = false;
        },
      });
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

  loadFavoriteItems(): void {
    console.log('loadFavoriteItems');

    this.showFavorites = !this.showFavorites;
    this.searchTerm = ''
    this.selectedSpecies = ''
    this.selectedGender = ''
    this.selectedStatus = ''

    this.fetchCharacters(1, this.searchTerm, this.selectedSpecies, this.selectedGender, this.selectedStatus);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchCharacters(this.currentPage, this.searchTerm, this.selectedSpecies, this.selectedGender, this.selectedStatus);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchCharacters(this.currentPage, this.searchTerm, this.selectedSpecies, this.selectedGender, this.selectedStatus);
    }
  }

  onSearchChange(): void {
    this.fetchCharacters(1, this.searchTerm);
  }

  selectSpecie(specie: string) {
    if (specie === this.selectedSpecies) {
      this.selectedSpecies = ''
    } else {
      this.selectedSpecies = specie;
    }

    this.fetchCharacters(1, this.searchTerm, this.selectedSpecies, this.selectedGender, this.selectedStatus);
  }

  selectGender(gender: string) {
    if (gender === this.selectedGender) {
      this.selectedGender = ''
    } else {
      this.selectedGender = gender;
    }

    this.fetchCharacters(1, this.searchTerm, this.selectedSpecies, this.selectedGender, this.selectedStatus);
  }

  selectStatus(status: string) {
    if (status === this.selectedStatus) {
      this.selectedStatus = ''
    } else {
      this.selectedStatus = status;
    }

    this.fetchCharacters(1, this.searchTerm, this.selectedSpecies, this.selectedGender, this.selectedStatus);
  }

  onPageSelect(event: Event): void {
    const selectedPage = +(event.target as HTMLSelectElement).value;
    this.currentPage = selectedPage;
    this.fetchCharacters(this.currentPage, this.searchTerm, this.selectedSpecies, this.selectedGender, this.selectedStatus);
  }

  resetFilter() {
    this.showFavorites = false;
    this.currentPage == 1;
    this.searchTerm = '';
    this.selectedSpecies = '';
    this.selectedGender = '';
    this.selectedStatus = '';
    this.fetchCharacters(this.currentPage, this.searchTerm, this.selectedSpecies, this.selectedGender, this.selectedStatus);
  }
}
