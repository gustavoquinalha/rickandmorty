import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/character-list/character-list.component').then(m => m.CharacterListComponent)
  },
  {
    path: 'feedback',
    loadComponent: () => import('./pages/contact-form/contact-form.component').then(m => m.ContactFormComponent)
  },
  {
    path: 'character/:id',
    loadComponent: () => import('./pages/character-detail/character-detail.component').then(m => m.CharacterDetailComponent)
  },
  {
    path: 'locations',
    loadComponent: () => import('./pages/locations-list/locations-list.component').then(m => m.LocationsListComponent)
  },
  {
    path: 'location/:id',
    loadComponent: () => import('./pages/location/location.component').then(m => m.LocationComponent)
  },
  {
    path: 'episodes',
    loadComponent: () => import('./pages/episodes-list/episodes-list.component').then(m => m.EpisodesListComponent)
  },
  {
    path: 'episode/:id',
    loadComponent: () => import('./pages/episode/episode.component').then(m => m.EpisodeComponent)
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
];
