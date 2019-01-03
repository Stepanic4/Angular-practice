import { UserInterface } from '../interfaces/user.interface';
import { ExternalAccountModel } from './external-account.model';

export class UserModel implements UserInterface {
  public id: string;
  public name: string;
  public email: string;
  public username: string;
  public street: string;
  public suite: string;
  public externalAccounts: ExternalAccountModel[];

  constructor(params: UserInterface = {} as UserInterface) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
    this.username = params.username;
    this.street = params.street;
    this.suite = params.suite;
    this.externalAccounts = params.externalAccounts;
  }
}
