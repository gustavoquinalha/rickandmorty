import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Importar FormsModule
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { Character, ApiResponse } from '../../interface/characters';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
  providers: [RickAndMortyService]
})
export class CharacterListComponent implements OnInit {
  characters?: Character[] = [];
  filteredCharacters: Character[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  searchTerm: string = '';
  selectedSpecies: string = '';
  selectedGender: string = '';
  selectedStatus: string = '';
  loadingCharacters = true;
  pagesArray: number[] = [];

  constructor(private rickAndMortyService: RickAndMortyService) { }

  ngOnInit(): void {
    this.fetchCharacters(this.currentPage);
  }

  fetchCharacters(page: number, name: string = '', specie: string = '', gender: string = '', status: string = ''): void {
    this.loadingCharacters = true;
    setTimeout(() => {
      this.rickAndMortyService.getCharacters(page, name, specie, gender, status).subscribe({
        next: (response: ApiResponse) => {
          if (response) {
            this.characters = response.results;
            this.filteredCharacters = this.characters;
            this.totalPages = response.info.pages;
            this.loadingCharacters = false;

            this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          }
        },
        error: (error) => {
          console.error('Erro ao buscar personagens:', error);
          this.loadingCharacters = false;
        }
      });
    }, 1000);
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

    this.fetchCharacters(this.currentPage, this.searchTerm, this.selectedSpecies, this.selectedGender, this.selectedStatus);
  }

  selectGender(gender: string) {
    if (gender === this.selectedGender) {
      this.selectedGender = ''
    } else {
      this.selectedGender = gender;
    }

    this.fetchCharacters(this.currentPage, this.searchTerm, this.selectedSpecies, this.selectedGender, this.selectedStatus);
  }

  selectStatus(status: string) {
    if (status === this.selectedStatus) {
      this.selectedStatus = ''
    } else {
      this.selectedStatus = status;
    }

    this.fetchCharacters(this.currentPage, this.searchTerm, this.selectedSpecies, this.selectedGender, this.selectedStatus);
  }

  onPageSelect(event: Event): void {
    const selectedPage = +(event.target as HTMLSelectElement).value;
    this.currentPage = selectedPage;
    this.fetchCharacters(this.currentPage, this.searchTerm, this.selectedSpecies, this.selectedGender, this.selectedStatus);
  }
}
