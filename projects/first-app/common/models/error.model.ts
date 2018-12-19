import { ErrorInterface } from '../interfaces/error.interface';

export class ErrorModel<D, E> implements ErrorInterface<D, E> {
  /**
   * Human-readable string
   * @type { String }
   */
  public description: string;

  /**
   * Any data that we want to pass
   * @type { D }
   */
  public data: D;

  /**
   * Any error that we want to pass to user
   * @type { E }
   */
  public error: E;

  constructor(params: ErrorInterface<D, E> = {} as ErrorInterface<D, E>) {
    this.description = params.description || 'Unhandled Error';
    this.data = params.data;
    this.error = params.error;
  }
}
