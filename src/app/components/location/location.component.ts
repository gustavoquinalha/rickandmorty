import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {
  locationId: any;
  location?: any;
  maxLocation = 126;
  constructor(
    private route: ActivatedRoute,
    private rickAndMortyService: RickAndMortyService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.locationId = Number(params.get('id'));
      console.log('locationId', this.locationId);

      this.rickAndMortyService.getLocationById(this.locationId!).subscribe((location) => {
        console.log('location', location);
        this.location = location;
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
