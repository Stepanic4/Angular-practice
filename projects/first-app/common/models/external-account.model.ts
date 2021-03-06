import { ExternalAccountInterface } from '../interfaces/external-account.interface';

export class ExternalAccountModel implements ExternalAccountInterface {
  public id: string;
  public serverName: string;
  public name: string;
  public email: string;
  public username: string;
  public street: string;
  public suite: string;

  constructor(params: ExternalAccountInterface = {} as ExternalAccountInterface) {
    this.id = params.id;
    this.serverName = params.serverName;
    this.name = params.name;
    this.email = params.email;
    this.username = params.username;
    this.street = params.street;
    this.suite = params.suite;
  }
}
