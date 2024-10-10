import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { Character, Location } from '../../interface/characters';
import { AvatarCharactersComponent } from '../../components/avatar-characters/avatar-characters.component';
import { EmptyResultComponent } from '../../components/empty-result/empty-result.component';
import { CardLocationComponent } from '../../components/card-location/card-location.component';
import { TopbarActionsComponent } from '../../components/topbar-actions/topbar-actions.component';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent, AvatarCharactersComponent, EmptyResultComponent, CardLocationComponent, TopbarActionsComponent, TranslateModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {
  locationId: number = 0;
  location?: Location;
  maxLocation = 126;
  loadingLocation = true;
  loadingCharacter = true;
  character?: Character[];
  private routeSubscription: Subscription = new Subscription();
  constructor(
    private route: ActivatedRoute,
    private rickAndMortyService: RickAndMortyService,
  ) { }
  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.locationId = Number(params.get('id'));
      this.getLocationById();
    });
  }

  getLocationById() {
    this.loadingLocation = true;
    this.rickAndMortyService.getLocationById(this.locationId!).subscribe({
      next: (location: Location) => {
        this.location = location;
        this.loadingLocation = false;
      },
      error: () => {
        this.loadingLocation = false;
      }
    }).add(() => {
      this.getResidents(this.location?.residents!);
    });
  }

  getResidents(residents: string[]) {
    this.loadingCharacter = true;
    const ids = this.getIds(residents);
    if (ids.length) {
      this.rickAndMortyService.getCharacterById(ids!).subscribe({
        next: (character: Character) => {
          if (character) {
            this.character = character instanceof Array ? character : [character];
            this.loadingCharacter = false;
          }
        },
        error: () => {
          this.loadingCharacter = false;
        },
      });
    } else {
      this.character = [];
      this.loadingCharacter = false;
    }
  }

  getIds(residents: string[]) {
    return residents.map((id: string) => {
      const parts = id.split('/');
      return parseInt(parts[parts.length - 1], 10);
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
