import { UserModel } from '../models/user.model';

export interface StoreStateInterface {
  userCache: UserModel[];
  user: UserModel;
}
