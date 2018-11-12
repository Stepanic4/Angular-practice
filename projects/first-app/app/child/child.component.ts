import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import { UserModel } from '../../common/models/user.model';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: [ './child.component.scss' ]
})

export class ChildComponent {
  /**
   * Value for this property will be given from parent component via [someLabelFromParentComponent]="someValue" in the HTML template
   * We'll get here clicked item (key) from preparedList property that will be given to parent and then - to this component
   * @type { String }
   */
  @Input()
  public clickedProperty: string;

  /**
   * Test setter. Body will be executed every time when value from parent will be changed
   * @param map { Map<String, Number> }
   * @returns { void }
   */
  @Input()
  public set someMap(map: Map<string, number>) {
    // Saving the whole map in the class property
    this.mapFromParentComponent = map;

    // Removing old values
    this.preparedList = [];

    // This logic described in the OOP.ts file from the Slack
    const keysIterator: IterableIterator<string> = map.keys();
    let mapKeysCurrentValue: IteratorResult<string> = keysIterator.next();

    while (!mapKeysCurrentValue.done) {
      // Saving each item in the property
      this.preparedList.push(mapKeysCurrentValue.value);

      // Getting the next item
      mapKeysCurrentValue = keysIterator.next();
    }
  }

  /**
   * We'll give to parent component key from given map when user clicks on it
   * @type { EventEmitter<UserModel> }
   */
  @Output()
  public onMapItemClick: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Saved map given from the parent component via someMap setter
   * @type { Map<string, number> }
   */
  public mapFromParentComponent: Map<string, number>;

  /**
   * List of map keys that will be created from the map given in someMap setter
   * @type { String[] }
   */
  public preparedList: string[];

  /**
   * User model that we'll get from the UserService via EventEmitter will be saved here
   * @type { UserModel }
   */
  public user: UserModel;

  constructor(private userService: UserService) {
    this.userService.onUserChange.subscribe(
      // Simple param for the .subscribe method - callback function
      // Will be called when someone calls .onUserChange.emit(newUserModelInstance) in the UserService
      (user: UserModel): void => {
        this.user = user;
      }
    );
  }

  /**
   * Handler that will be called when user clicks on some of the items given from the parent component
   * @param item { String }
   * @returns { void }
   */
  public mapItemClickHandler(item: string): void {
    // Checking if map has given property
    if (this.mapFromParentComponent.has(item)) {
      // Emitting the event
      this.onMapItemClick.emit(item);
    }
  }

  /**
   * Method overwrites old user name with new one
   * @param newUserName { String }
   * @returns { void }
   */
  public changeUserName(newUserName): void {
    if (newUserName !== this.user) {
      this.userService
        .changeUser(new UserModel({ id: this.user.id, name: newUserName }))
        .then((newUserModel: UserModel): void => {
          // We don't save user model here since it will be overwritten in the handler of EventEmitter
          console.log('ChildComponent->changeUserName: User changed to', newUserModel);
        });
    }
  }
}
