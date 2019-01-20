import { Action } from '@ngrx/store';

export interface ActionInterface<T> extends Action {
  type: string;
  payload: T;
}
