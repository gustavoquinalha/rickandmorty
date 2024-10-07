import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { FavoriteService } from '../../services/favorite.service';
import { FilterService } from '../../services/filter.service';

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
  @Input() showFavorites: boolean = false;

  private searchTermSubject: Subject<string> = new Subject<string>();
  private searchSubscription: Subscription;

  constructor(private favoriteService: FavoriteService, private filterService: FilterService) {
    this.searchSubscription = this.searchTermSubject.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((searchTerm: string) => {
      this.searchTerm = searchTerm;
      this.updateFilter();
    });
  }

  onSearchChange() {
    this.searchTermSubject.next(this.searchTerm);
  }

  selectGender(gender: string) {
    this.selectedGender = this.selectedGender !== gender ? gender : '';
    this.updateFilter();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  selectSpecie(specie: string) {
    this.selectedSpecies = this.selectedSpecies !== specie ? specie : '';
    this.updateFilter();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  selectStatus(status: string) {
    this.selectedStatus = this.selectedStatus !== status ? status : '';
    this.updateFilter();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  loadFavoriteItems() {
    this.showFavorites = !this.showFavorites;

    if (this.showFavorites) {
      this.searchTerm = '';
      this.selectedGender = '';
      this.selectedSpecies = '';
      this.selectedStatus = '';
    }

    this.updateFilter();
  }

  updateFilter() {
    this.filterService.updateFilter({
      favorite: this.showFavorites,
      search: this.searchTerm,
      gender: this.selectedGender,
      specie: this.selectedSpecies,
      status: this.selectedStatus,
    });
  }

  resetFilter() {
    this.searchTerm = '';
    this.selectedGender = '';
    this.selectedSpecies = '';
    this.selectedStatus = '';
    this.showFavorites = false;

    this.updateFilter();
  }

  get getFavoritesLength() {
    return this.favoriteService.getFavorites().length
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
