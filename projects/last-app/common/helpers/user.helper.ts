import { KeyValueInterface } from '../interfaces/key-value.interface';
import { UserModel } from '../models/user.model';
import { ExternalAccountModel } from '../models/external-account.model';

export class UserHelper {
  /**
   * Method creates user model from untyped data
   * @param parsed { KeyValueInterface<Any> }
   * @returns { UserModel }
   */
  public static createUserModel(parsed: KeyValueInterface<any> = {}): UserModel {
    return new UserModel({
      id: parsed.id.toString(),
      name: parsed.name,
      externalAccounts: (
        !!parsed.externalAccounts && parsed.externalAccounts instanceof Array
          ? parsed.externalAccounts.map(UserHelper.createExternalAccountModel)
          : []
      )
    });
  }

  /**
   * Method creates user model array from server data
   * @param data { Any }
   * @returns { UserModel[] }
   */
  public static createUserModelArray(data: any[]): UserModel[] {
    return data.map((item: KeyValueInterface<any>): UserModel => UserHelper.createUserModel(item));
  }

  /**
   * Method creates external account model from untyped data
   * @param parsed { KeyValueInterface<Any> }
   * @returns { ExternalAccountModel }
   */
  public static createExternalAccountModel(parsed: KeyValueInterface<any>): ExternalAccountModel {
    return new ExternalAccountModel({
      id: parsed.id,
      serverName: parsed.serverName,
      username: parsed.username
    });
  }

  /**
   * Method clones user model
   * @param model { UserModel }
   * @returns { UserModel }
   */
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

  /**
   * Method clones external account model
   * @param model { ExternalAccountModel }
   * @returns { ExternalAccountModel }
   */
  public static cloneExternalAccountModel(model: ExternalAccountModel): ExternalAccountModel {
    return new ExternalAccountModel({
      id: model.id,
      username: model.username,
      serverName: model.serverName
    });
  }
}
