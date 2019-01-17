import { Routes } from '@angular/router';
import { BaseComponent } from '../../app/base/base.component';
import { NotFoundComponent } from '../../app/not-found/not-found.component';
import { Level1Component } from '../../app/level1/level1.component';
import { Level2Component } from '../../app/level2/level2.component';
import { Level3Component } from '../../app/level3/level3.component';
import { AboutUsComponent } from '../../app/about-us/about-us.component';
import { MainPageComponent } from '../../app/main-page/main-page.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: '',
        component: MainPageComponent,
        pathMatch: 'full'
      },
      {
        path: 'level1',
        component: Level1Component,
        children: [
          {
            path: 'level2',
            component: Level2Component,
            data: { a: 1, b: 2, c: 3 }, // We can pass some data to component like this
            children: [
              {
                path: 'level3/:someItemID',
                component: Level3Component
              },
              {
                path: 'level3',
                component: Level3Component
              }
            ]
          }
        ]
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
      },
      {
        path: 'lazy-loaded-module',
        loadChildren: './lazy-loaded/lazy-loaded.module#LazyLoadedModule'
      }
    ]
  },
  { path: '**', component: NotFoundComponent }
];
