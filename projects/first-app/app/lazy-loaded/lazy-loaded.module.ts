import { NgModule } from '@angular/core';
import { LazyLoadedComponent } from './lazy-loaded/lazy-loaded.component';
import { RouterModule } from '@angular/router';
import { LAZY_LOADING_ROUTES } from '../../common/const/lazy-loaded.routes';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LazyLoadedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(LAZY_LOADING_ROUTES)
  ]
})

export class LazyLoadedModule {}
