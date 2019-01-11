import { NgModule } from '@angular/core';
import { LazyLoadedComponent } from './lazy-loaded/lazy-loaded.component';
import { RouterModule } from '@angular/router';
import { LAZY_LOADING_ROUTES } from '../../common/const/lazy-loaded.routes';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LazyLoadedComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LAZY_LOADING_ROUTES)
  ]
})

export class LazyLoadedModule {}
