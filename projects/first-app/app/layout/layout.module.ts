import {NgModule} from '@angular/core';
import {FooterComponent} from './footer/footer.component';
import {ContentComponent} from './content/content.component';
import {HeaderComponent} from './header/header.component';
import {AsideComponent} from './aside/aside.component';
import {CommonModule} from '@angular/common';
import {CheckboxComponent} from '../elements/checkbox/checkbox.component';
import {SelectComponent} from '../elements/select/select.component';
import {RadioComponent} from '../elements/radio/radio.component';

@NgModule({
  declarations: [
    ContentComponent,
    AsideComponent,
    FooterComponent,
    HeaderComponent,
    CheckboxComponent,
    SelectComponent,
    RadioComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContentComponent,
    AsideComponent,
    FooterComponent,
    HeaderComponent,
    CheckboxComponent,
    SelectComponent,
    RadioComponent
  ]
})

export class LayoutModule {}
