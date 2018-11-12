import { UserInterface } from '../interfaces/user.interface';

export class UserModel implements UserInterface {
  public id: string;
  public name: string;

  constructor(params: UserInterface = {} as UserInterface) {
    this.id = params.id;
    this.name = params.name;
  }
}
