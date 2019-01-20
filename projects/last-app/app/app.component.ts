import { Component } from '@angular/core';
import { LayoutService } from '../common/services/layout.service';
import { StoreStateModel } from '../common/models/store-state.model';
import { Store } from '@ngrx/store';
import { ActionModel } from '../common/models/action.model';
import { UserModel } from '../common/models/user.model';
import { ActionUserCacheEnum } from '../common/enums/store/action-user-cache.enum';
import { KeyValueInterface } from '../common/interfaces/key-value.interface';
import { ActionUserEnum } from '../common/enums/store/action-user.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  private userCacheCounter: number = 0;
  private userCounter: number = 0;

  constructor(private store: Store<StoreStateModel>,
              private layoutService: LayoutService) {
    this.layoutService.onBodyClick.subscribe((event: MouseEvent): void => {
      console.log('Click', event);
    });
    this.layoutService.onBodyKeyDown.subscribe((event: KeyboardEvent): void => {
      console.log('KeyDown', event);
    });
    this.layoutService.onBodyKeyUp.subscribe((event: KeyboardEvent): void => {
      console.log('KeyUp', event);
    });

    setTimeout(
      (): void => {
        this.store.next(new ActionModel<KeyValueInterface<any>>({
          type: ActionUserEnum.Create,
          payload: { id: 'asdasdasdasdasdasd' }
        }));
      },
      4000
    );

    /*this.addUsers();
    this.changeUser();*/
  }

  private addUsers(): void {
    const timer: any = setInterval(
      (): void => {
        this.store.next(new ActionModel<UserModel[]>({
          type: ActionUserCacheEnum.Add,
          payload: [new UserModel({
            id: this.userCacheCounter.toString(),
            name: `User#${this.userCacheCounter}`,
            externalAccounts: []
          })]
        }));

        if (this.userCacheCounter < 10) {
          this.userCacheCounter ++;
        } else {
          this.userCacheCounter = 0;
          clearInterval(timer);
          this.removeUsers();
        }
      },
      2000
    );
  }

  private removeUsers(): void {
    const timer: any = setInterval(
      (): void => {
        this.store.next(new ActionModel<UserModel[]>({
          type: ActionUserCacheEnum.Remove,
          payload: [new UserModel({
            id: this.userCacheCounter.toString(),
            name: '',
            externalAccounts: []
          })]
        }));

        if (this.userCacheCounter < 10) {
          this.userCacheCounter ++;
        } else {
          this.userCacheCounter = 0;
          clearInterval(timer);
          this.addUsers();

          this.changeUser();
        }
      },
      2000
    );
  }

  private changeUser(): void {
    setInterval(
      (): void => {
        this.store.next(new ActionModel<KeyValueInterface<any>>({
          type: ActionUserEnum.Edit,
          payload: {
            name: `LoggedUser#${this.userCounter}`
          }
        }));

        if (this.userCounter > 20) {
          this.userCounter = 0;
        } else {
          this.userCounter ++;
        }
      },
      5000
    );
  }
}
