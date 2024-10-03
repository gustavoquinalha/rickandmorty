import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/character-list/character-list.component').then(m => m.CharacterListComponent)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./components/favorites/favorites.component').then(m => m.FavoritesComponent)
  },
  {
    path: 'character/:id',
    loadComponent: () => import('./components/character-detail/character-detail.component').then(m => m.CharacterDetailComponent)
  },
  {
    path: 'location/:id',
    loadComponent: () => import('./components/location/location.component').then(m => m.LocationComponent)
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
];
