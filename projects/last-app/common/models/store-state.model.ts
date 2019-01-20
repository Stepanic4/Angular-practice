import { StoreStateInterface } from '../interfaces/store-state.interface';
import { UserModel } from './user.model';

export class StoreStateModel implements StoreStateInterface {
  public userCache: UserModel[];
  public user: UserModel;

  constructor(params: StoreStateInterface = {} as StoreStateInterface) {
    this.userCache = params.userCache;
    this.user = params.user;
  }
}
