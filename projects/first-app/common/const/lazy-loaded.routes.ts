import { Routes } from '@angular/router';
import { LazyLoadedComponent } from '../../app/lazy-loaded/lazy-loaded/lazy-loaded.component';

export const LAZY_LOADING_ROUTES: Routes = [
  {
    path: '',
    component: LazyLoadedComponent
  }
];
