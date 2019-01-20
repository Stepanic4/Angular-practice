import { Component } from '@angular/core';
import { StoreStateModel } from '../../common/models/store-state.model';
import { UserModel } from '../../common/models/user.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user-cache-test',
  templateUrl: './user-cache-test.component.html',
  styleUrls: [ './user-cache-test.component.scss' ]
})

export class UserCacheTestComponent {
  public users: UserModel[];
  public user: UserModel;

  constructor(private store: Store<StoreStateModel>) {
    this.store.select('userCache').subscribe((state: UserModel[]): void => {
      console.log('SECTION CACHE', state);
      this.users = state;
    });

    this.store.select('user').subscribe((state: UserModel): void => {
      console.log('SECTION USER', state);
      this.user = state;
    });

    this.store.subscribe((state: StoreStateModel): void => {
      console.log('STORE', state);
    });
  }
}
