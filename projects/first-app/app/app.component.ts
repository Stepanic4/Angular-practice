import { Component } from '@angular/core';
import { LayoutService } from '../common/services/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private layoutService: LayoutService) {
    this.layoutService.onBodyClick.subscribe((event: MouseEvent): void => {
      console.log('Click', event);
    });
    this.layoutService.onBodyKeyDown.subscribe((event: KeyboardEvent): void => {
      console.log('KeyDown', event);
    });
    this.layoutService.onBodyKeyUp.subscribe((event: KeyboardEvent): void => {
      console.log('KeyUp', event);
    });
  }
}
