import { UserInterface } from '../interfaces/user.interface';
import { ExternalAccountModel } from './external-account.model';

export class UserModel implements UserInterface {
  public id: string;
  public name: string;
  public externalAccounts: ExternalAccountModel[];

  constructor(params: UserInterface = {} as UserInterface) {
    this.id = params.id;
    this.name = params.name;
    this.externalAccounts = params.externalAccounts;
  }
}
