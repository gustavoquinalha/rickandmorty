import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { Location } from '../../interface/characters';
import { TranslateModule } from '@ngx-translate/core';
import { CardLocationComponent } from '../../components/card-location/card-location.component';
import { EmptyResultComponent } from '../../components/empty-result/empty-result.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-locations-list',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent, EmptyResultComponent, CardLocationComponent, TranslateModule],
  templateUrl: './locations-list.component.html',
  styleUrl: './locations-list.component.scss'
})
export class LocationsListComponent {
  locations = new BehaviorSubject<Location[]>([]);
  loadingLocations = true;

  constructor(private rickAndMortyService: RickAndMortyService,) { }

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations() {
    this.loadingLocations = true;

    const arrayId: number[] = []
    this.rickAndMortyService
      .getLocations(arrayId)
      .subscribe({
        next: (response) => {
          if (response) {
            this.locations.next(response.results);
            this.loadingLocations = false;
          }
        },
        error: () => {
          this.locations.next([]);
          this.loadingLocations = false;
        },
      });
  }

  trackByLocation(_index: number, location: Location): number {
    return location.id;
  }
}
