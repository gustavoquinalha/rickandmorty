import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/character-list/character-list.component').then(m => m.CharacterListComponent)
  },
  {
    path: 'feedback',
    loadComponent: () => import('./components/contact-form/contact-form.component').then(m => m.ContactFormComponent)
  },
  {
    path: 'character/:id',
    loadComponent: () => import('./components/character-detail/character-detail.component').then(m => m.CharacterDetailComponent)
  },
  {
    path: 'locations',
    loadComponent: () => import('./components/locations-list/locations-list.component').then(m => m.LocationsListComponent)
  },
  {
    path: 'location/:id',
    loadComponent: () => import('./components/location/location.component').then(m => m.LocationComponent)
  },
  {
    path: 'episodes',
    loadComponent: () => import('./components/episodes-list/episodes-list.component').then(m => m.EpisodesListComponent)
  },
  {
    path: 'episode/:id',
    loadComponent: () => import('./components/episode/episode.component').then(m => m.EpisodeComponent)
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
];
