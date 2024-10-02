import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/character-list/character-list.component').then(m => m.CharacterListComponent)
  },
  // {
  //   path: 'character/:id',
  //   loadComponent: () => import('./components/character-detail/character-detail.component').then(m => m.CharacterDetailComponent)
  // },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
];
