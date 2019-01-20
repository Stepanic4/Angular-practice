import { UserModel } from '../models/user.model';
import { ActionUserCacheEnum } from '../enums/store/action-user-cache.enum';
import { ActionModel } from '../models/action.model';
import { KeyValueInterface } from '../interfaces/key-value.interface';
import { ActionUserEnum } from '../enums/store/action-user.enum';
import { UserInterface } from '../interfaces/user.interface';

export class UserReducer {
  public static userCacheReducer(state: UserModel[] = [], action: ActionModel<UserModel[]>): UserModel[] {
    switch (action.type) {
      case ActionUserCacheEnum.Add: {
        console.log('UserReducer->userCacheReducer: Add', action);
        const newIDs: string[] = action.payload.map<string>((u: UserModel): string => u.id);
        return [
          ... state.filter((u: UserModel): boolean => !newIDs.includes(u.id)),
          ... action.payload
        ].sort((a: UserModel, b: UserModel): number => {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      case ActionUserCacheEnum.Remove: {
        console.log('UserReducer->userCacheReducer: Remove', action);
        const newIDs: string[] = action.payload.map<string>((u: UserModel): string => u.id);
        return [ ... state.filter((u: UserModel): boolean => !newIDs.includes(u.id)) ];
      }
      default: {
        console.log('UserReducer->userCacheReducer: Default', action);
        return state;
      }
    }
  }

  public static userReducer(state: UserModel = new UserModel(), action: ActionModel<KeyValueInterface<any>>): UserModel {
    switch (action.type) {
      case ActionUserEnum.Create: {
        console.log('UserReducer->userReducer: Create', action);
        return new UserModel(action.payload as UserInterface);
      }
      case ActionUserEnum.Edit: {
        console.log('UserReducer->userReducer: Edit', action);
        const params: UserInterface = {} as UserInterface;
        params.id = action.payload.id || state.id;
        params.name = action.payload.name || state.name;
        params.id = action.payload.externalAccounts || state.externalAccounts;
        return new UserModel(params);
      }
      default: {
        console.log('UserReducer->userReducer: Default', action);
        return state;
      }
    }
  }
}
