import { Component } from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RickAndMortyService } from '../../services/rick-and-morty.service';

@Component({
  selector: 'app-locations-list',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent],
  templateUrl: './locations-list.component.html',
  styleUrl: './locations-list.component.scss'
})
export class LocationsListComponent {
  locations?: any;
  loadingLocations = true;
  count = 0;
  pages = 1;

  constructor(private rickAndMortyService: RickAndMortyService,) { }

  ngOnInit(): void {
    console.log('getLocations');
    this.getLocations();
  }

  getLocations() {
    this.loadingLocations = true;

    this.rickAndMortyService
      .getLocations([])
      .subscribe({
        next: (response: any) => {
          console.log('response', response);

          if (response) {

            this.count = response.info.count;
            this.pages = response.info.pages;

            this.locations = response.results;
            this.loadingLocations = false;
          }
        },
        error: (_err) => {
          this.loadingLocations = false;
        },
      });
  }
}
