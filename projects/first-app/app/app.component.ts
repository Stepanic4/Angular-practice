import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  /**
   * Map will be given to child component to demonstrate how @Input() decorator works
   * @type { Map<String, Number> }
   */
  public map: Map<string, number> = new Map<string, number>()
    .set('a', 1)
    .set('b', 2)
    .set('c', 3);

  /**
   * Key from the map property that will be clicked in the child component and returned to this component
   * We'll return this property to child component to show which item is selected now
   * @type { String }
   */
  public clickedProperty: string;

  /**
   * Handler for the onMapItemClick event of child component that will be emitted via EventEmitter
   * @param clickedMapKey { String }
   * @returns { void }
   */
  public onMapItemClickHandler(clickedMapKey: string): void {
    if (this.map.has(clickedMapKey)) {
      this.clickedProperty = clickedMapKey;
    }
  }
}
