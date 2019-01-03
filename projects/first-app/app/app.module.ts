import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HighlightDirective } from '../common/directives/highlight.directive';
import { AppComponent } from './app.component';
import { BaseComponent } from './base/base.component';
import { ChildComponent } from './child/child.component';
import { Level1Component } from './level1/level1.component';
import { Level2Component } from './level2/level2.component';
import { Level3Component } from './level3/level3.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ROUTES } from '../common/const/routes.const';
import { MapKeysPipe } from '../common/pipes/map-keys.pipe';
import { Interceptor } from '../common/services/http-interceptor';
import {AsideComponent} from './layout/aside/aside.component';
import {FooterComponent} from './layout/footer/footer.component';
import {CreateAccountComponent} from './login/create-account/create-account.component';
import {ForgotPasswordComponent} from './login/forgot-password/forgot-password.component';
import {SignInComponent} from './login/sign-in/sign-in.component';
import {SearchPipe} from '../common/pipes/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    ChildComponent,
    Level1Component,
    Level2Component,
    Level3Component,
    AboutUsComponent,
    MainPageComponent,
    NotFoundComponent,
    HighlightDirective,
    MapKeysPipe,
    SearchPipe,
    AsideComponent,
    FooterComponent,
    CreateAccountComponent,
    ForgotPasswordComponent,
    SignInComponent
  ],
  imports: [
    NgbModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
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
