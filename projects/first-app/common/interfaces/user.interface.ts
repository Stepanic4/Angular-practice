import { ExternalAccountModel } from '../models/external-account.model';

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  username: string;
  street: string;
  suite: string;
  externalAccounts: ExternalAccountModel[];
}
