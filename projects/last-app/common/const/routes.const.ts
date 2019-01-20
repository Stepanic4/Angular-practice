import { Routes } from '@angular/router';
import { BaseComponent } from '../../app/base/base.component';
import { NotFoundComponent } from '../../app/not-found/not-found.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
    ]
  },
  { path: '**', component: NotFoundComponent }
];
