import { EventEmitter, Injectable } from '@angular/core';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';

@Injectable({ providedIn: 'root' })

export class LayoutService {
  /**
   * Event will be emitted for each click on body element
   * @type { EventEmitter<MouseEvent> }
   */
  public onBodyClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * Event will be emitted for each onkeydown event on body element
   * @type { EventEmitter<KeyboardEvent> }
   */
  public onBodyKeyDown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

  /**
   * Event will be emitted for each onkeyup event on body element
   * @type { EventEmitter<KeyboardEvent> }
   */
  public onBodyKeyUp: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

  constructor() {
    // Function fromEvent is a wrapper above the addEventListener from RXJS
    fromEvent<MouseEvent>(document.body, 'click').subscribe((event: MouseEvent): void => this.onBodyClick.emit(event));
    fromEvent<KeyboardEvent>(document.body, 'keydown').subscribe((event: KeyboardEvent): void => this.onBodyKeyDown.emit(event));
    fromEvent<KeyboardEvent>(document.body, 'keyup').subscribe((event: KeyboardEvent): void => this.onBodyKeyUp.emit(event));
  }
}
