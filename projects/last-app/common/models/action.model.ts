import { ActionInterface } from '../interfaces/action.interface';

export class ActionModel<T> implements ActionInterface<T> {
  public type: string;
  public payload: T;
  constructor(params: ActionInterface<T> = {} as ActionInterface<T>) {
    this.type = params.type;
    this.payload = params.payload;
  }
}
