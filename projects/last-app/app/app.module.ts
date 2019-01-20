import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HighlightDirective } from '../common/directives/highlight.directive';
import { AppComponent } from './app.component';
import { BaseComponent } from './base/base.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MapKeysPipe } from '../common/pipes/map-keys.pipe';
import { Interceptor } from '../common/services/http-interceptor';
import { ROUTES } from '../common/const/routes.const';
import { UserReducer } from '../common/reducers/user.reducer';
import { UserCacheTestComponent } from './user-cache-test/user-cache-test.component';
import { StoreStateModel } from '../common/models/store-state.model';
import { StoreModule } from '@ngrx/store';
import { ActionModel } from '../common/models/action.model';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    NotFoundComponent,
    UserCacheTestComponent,
    HighlightDirective,
    MapKeysPipe
  ],
  imports: [
    NgbModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot<StoreStateModel, ActionModel<any>>({
      userCache: UserReducer.userCacheReducer,
      user: UserReducer.userReducer
    }),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
