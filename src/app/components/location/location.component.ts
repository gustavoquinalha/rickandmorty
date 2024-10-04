import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {
  locationId: any;
  location?: any;
  maxLocation = 126;
  loadingLocation = true;
  constructor(
    private route: ActivatedRoute,
    private rickAndMortyService: RickAndMortyService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.loadingLocation = true;
      this.locationId = Number(params.get('id'));
      this.rickAndMortyService.getLocationById(this.locationId!).subscribe({
        next: (location) => {
          this.location = location;
          this.loadingLocation = false;
        },
        error: (_err) => {
          this.loadingLocation = false;
        }
      });
    });
  }

  goToPreviousLocation() {
    if (this.locationId > 1) {
      this.router.navigate(['/location', Number(this.locationId) - 1]);
    }
  }

  goToNextLocation() {
    if (this.locationId < this.maxLocation) {
      this.router.navigate(['/location', Number(this.locationId) + 1]);
    }
  }

}
