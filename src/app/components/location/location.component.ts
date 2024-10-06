import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { Character } from '../../interface/characters';
import { AvatarCharactersComponent } from '../avatar-characters/avatar-characters.component';
import { EmptyResultComponent } from '../empty-result/empty-result.component';
import { CardLocationComponent } from '../card-location/card-location.component';
import { TopbarActionsComponent } from '../topbar-actions/topbar-actions.component';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent, AvatarCharactersComponent, EmptyResultComponent, CardLocationComponent, TopbarActionsComponent],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {
  locationId: any;
  location?: any;
  maxLocation = 126;
  loadingLocation = true;
  loadingCharacter = true;
  character?: Character[];
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

          this.getCharacters(location.residents);
        },
        error: (_err) => {
          this.loadingLocation = false;
          this.loadingCharacter = false;
        }
      });
    });
  }

  getCharacters(residents: number[]) {
    this.loadingCharacter = true;

    const ids = residents.map((id: any) => {
      const parts = id.split('/');
      return parseInt(parts[parts.length - 1], 10);
    });

    if (ids.length) {
      this.rickAndMortyService.getCharacterById(ids).subscribe({
        next: (character: any) => {
          if (character) {
            this.character = character instanceof Array ? character : [character];
            this.loadingCharacter = false;
          }
        },
        error: (_err) => {
          this.loadingCharacter = false;
        },
      });
    } else {
      this.character = [];
      this.loadingCharacter = false;
    }
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
