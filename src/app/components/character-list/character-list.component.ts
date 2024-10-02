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
  speciesOptions: string[] = [];

  constructor(private rickAndMortyService: RickAndMortyService) { }

  ngOnInit(): void {
    this.fetchCharacters(this.currentPage);
  }

  fetchCharacters(page: number, name: string = '', specie: string = '', gender: string = ''): void {
    this.rickAndMortyService.getCharacters(page, name, specie, gender).subscribe((response: ApiResponse) => {
      if (response) {
        console.log('response', response);
        this.characters = response.results;
        this.filteredCharacters = this.characters;
        this.totalPages = response.info.pages;
        this.speciesOptions = Array.from(new Set(this.characters.map(character => character.species)));
      }
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchCharacters(this.currentPage, this.searchTerm, this.selectedSpecies, this.selectedGender);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchCharacters(this.currentPage, this.searchTerm, this.selectedSpecies, this.selectedGender);
    }
  }

  onSearchChange(): void {
    this.fetchCharacters(1, this.searchTerm);
  }

  selectSpecie(specie: string) {
    console.log('selectSpecie', specie);

    if (specie === this.selectedSpecies) {
      this.selectedSpecies = ''
    } else {
      this.selectedSpecies = specie;
    }

    this.fetchCharacters(this.currentPage, this.searchTerm, this.selectedSpecies, this.selectedGender);
  }

  selectGender(gender: string) {
    console.log('selectedGender', gender);

    if (gender === this.selectedGender) {
      this.selectedGender = ''
    } else {
      this.selectedGender = gender;
    }

    this.fetchCharacters(this.currentPage, this.searchTerm, this.selectedSpecies, this.selectedGender);
  }
}
