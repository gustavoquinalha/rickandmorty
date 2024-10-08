import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { Location } from '../../interface/characters';
import { TranslateModule } from '@ngx-translate/core';
import { CardLocationComponent } from '../../components/card-location/card-location.component';
import { EmptyResultComponent } from '../../components/empty-result/empty-result.component';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-locations-list',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent, EmptyResultComponent, CardLocationComponent, TranslateModule],
  templateUrl: './locations-list.component.html',
  styleUrl: './locations-list.component.scss'
})
export class LocationsListComponent {
  locations?: Location[];
  loadingLocations = true;
  count = 0;
  pages = 1;

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
            this.count = response.info.count;
            this.pages = response.info.pages;
            this.locations = response.results;
            this.loadingLocations = false;
          }
        },
        error: () => {
          this.loadingLocations = false;
        },
      });
  }
}
