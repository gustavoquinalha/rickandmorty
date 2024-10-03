import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss'],
})
export class FilterListComponent {
  searchTerm: string = '';
  selectedGender: string | null = null;
  selectedSpecies: string | null = null;
  selectedStatus: string | null = null;
  showFavorites: boolean = false;

  @Output() searchTermChange = new EventEmitter<string>();
  @Output() genderChange = new EventEmitter<string>();
  @Output() speciesChange = new EventEmitter<string>();
  @Output() statusChange = new EventEmitter<string>();
  @Output() favoritesToggle = new EventEmitter<boolean>();
  @Output() resetFilters = new EventEmitter<void>();

  onSearchChange() {
    this.searchTermChange.emit(this.searchTerm);
  }

  selectGender(gender: string) {
    this.selectedGender = gender;
    this.genderChange.emit(gender);
  }

  selectSpecie(specie: string) {
    this.selectedSpecies = specie;
    this.speciesChange.emit(specie);
  }

  selectStatus(status: string) {
    this.selectedStatus = status;
    this.statusChange.emit(status);
  }

  loadFavoriteItems() {
    this.showFavorites = !this.showFavorites;
    this.favoritesToggle.emit(this.showFavorites);
    this.searchTerm = '';
    this.searchTermChange.emit(this.searchTerm);
    this.selectGender('');
    this.selectSpecie('');
    this.selectStatus('');
  }

  resetFilter() {
    this.searchTerm = '';
    this.searchTermChange.emit(this.searchTerm);
    this.selectGender('');
    this.selectSpecie('');
    this.selectStatus('');
    this.showFavorites = false;
    this.favoritesToggle.emit(this.showFavorites);
    this.resetFilters.emit();
  }
}
