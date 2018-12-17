import { UserModel } from '../models/user.model';
import { ExternalAccountModel } from '../models/external-account.model';
import { KeyValueInterface } from '../interfaces/key-value.interface';

export class UserHelper {
  /**
   * Method creates user model from untyped data
   * @param parsed { KeyValueInterface<Any> }
   * @returns { UserModel }
   */
  public static createUserModel(parsed: KeyValueInterface<any>): UserModel {
    return new UserModel({
      id: parsed.id.toString(),
      name: parsed.name,
      email: parsed.email,
      username: parsed.username,
      street: parsed.address.street,
      suite: parsed.address.suite,
      externalAccounts: (
        !!parsed.externalAccounts && parsed.externalAccounts instanceof Array
          ? parsed.externalAccounts.map(UserHelper.createExternalAccountModel)
          : []
      )
    });
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
      name: parsed.name,
      email: parsed.email,
      username: parsed.username,
      street: parsed.street,
      suite: parsed.suite
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
      email: model.email,
      username: model.username,
      street: model.street,
      suite: model.suite,
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
      name: model.name,
      serverName: model.serverName,
      email: model.email,
      username: model.username,
      street: model.street,
      suite: model.suite
    });
  }
}
