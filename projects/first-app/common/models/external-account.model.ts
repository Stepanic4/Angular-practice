import { ExternalAccountInterface } from '../interfaces/external-account.interface';

export class ExternalAccountModel implements ExternalAccountInterface {
  public id: string;
  public serverName: string;
  public username: string;

  constructor(params: ExternalAccountInterface = {} as ExternalAccountInterface) {
    this.id = params.id;
    this.serverName = params.serverName;
    this.username = params.username;
  }
}
