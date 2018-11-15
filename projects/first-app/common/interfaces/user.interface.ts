import { ExternalAccountModel } from '../models/external-account.model';

export interface UserInterface {
  id: string;
  name: string;
  externalAccounts: ExternalAccountModel[];
}
