export interface ErrorInterface<D, E> {
  /**
   * Human-readable string
   * @type { String }
   */
  description: string;

  /**
   * Any data that we want to pass
   * @type { D }
   */
  data: D;

  /**
   * Any error that we want to pass to user
   * @type { E }
   */
  error: E;
}
