import { UserModel } from '../models/user.model';
import { ExternalAccountModel } from '../models/external-account.model';

export class UserHelper {
  public static createUserModel(parsed: any): UserModel {
    return new UserModel({
      id: parsed.id,
      name: parsed.name,
      externalAccounts: parsed.externalAccounts
    });
  }

  public static createExternalAccountModel(parsed: any): ExternalAccountModel {
    return new ExternalAccountModel({
      id: parsed.id,
      serverName: parsed.serverName,
      username: parsed.username
    });
  }

  public static cloneUserModel(model: UserModel): UserModel {
    return new UserModel({
      id: model.id,
      name: model.name,
      externalAccounts: model.externalAccounts.map<ExternalAccountModel>(
        (m: ExternalAccountModel): ExternalAccountModel => {
          return UserHelper.cloneExternalAccountModel(m);
        }
      )
    });
  }

  public static cloneExternalAccountModel(model: ExternalAccountModel): ExternalAccountModel {
    return new ExternalAccountModel({
      id: model.id,
      username: model.username,
      serverName: model.serverName
    });
  }
}
