import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss'],
})
export class FilterListComponent {
  @Input() searchTerm: string = '';
  @Input() selectedGender: string = '';
  @Input() selectedSpecies: string = '';
  @Input() selectedStatus: string = '';
  @Input() showFavorites?: boolean = false;

  @Output() searchTermChange = new EventEmitter<string>();
  @Output() genderChange = new EventEmitter<string>();
  @Output() speciesChange = new EventEmitter<string>();
  @Output() statusChange = new EventEmitter<string>();
  @Output() favoritesToggle = new EventEmitter<boolean>();
  @Output() resetFilters = new EventEmitter<void>();

  private searchTermSubject: Subject<string> = new Subject<string>();

  constructor(private favoriteService: FavoriteService) {
    this.searchTermSubject.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((searchTerm: string | undefined) => {
      this.searchTermChange.emit(searchTerm);
    });
  }

  onSearchChange() {
    this.searchTermSubject.next(this.searchTerm);
  }

  selectGender(gender: string) {
    this.selectedGender = this.selectedGender !== gender ? gender : '';
    this.genderChange.emit(gender);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  selectSpecie(specie: string) {
    this.selectedSpecies = this.selectedSpecies !== specie ? specie : '';
    this.speciesChange.emit(this.selectedSpecies);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  selectStatus(status: string) {
    this.selectedStatus = this.selectedStatus !== status ? status : '';
    this.statusChange.emit(this.selectedStatus);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  loadFavoriteItems() {
    this.showFavorites = !this.showFavorites;
    this.favoritesToggle.emit(this.showFavorites);
  }

  resetFilter() {
    this.resetSelects();
    this.showFavorites = false;
    this.favoritesToggle.emit(this.showFavorites);
    this.resetFilters.emit();
  }

  resetSelects() {
    this.searchTerm = '';
    this.searchTermChange.emit(this.searchTerm);
    this.selectGender('');
    this.selectSpecie('');
    this.selectStatus('');
  }

  get getFavoritesLength() {
    return this.favoriteService.getFavorites().length
  }
}
