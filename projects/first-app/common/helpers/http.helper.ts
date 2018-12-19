import { KeyValueInterface } from '../interfaces/key-value.interface';

export class HttpHelper {
  public static createQueryString(queryParams: KeyValueInterface<any> = {}): string {
    let queryString: string = '';

    if (!!queryParams) {
      const keys: any[] = Object.keys(queryParams);

      for (let counter: number = 0; counter < keys.length; counter ++) {
        if (queryParams[keys[counter]] !== null && queryParams[keys[counter]] !== undefined) {
          if (queryParams[keys[counter]] instanceof Array && !!queryParams[keys[counter]].length) {
            for (let i: number = 0; i < queryParams[keys[counter]].length; i ++) {
              queryString += `${keys[counter]}[]=${queryParams[keys[counter]][i]}${i < queryParams[keys[counter]].length - 1 ? '&' : ''}`;
            }

            queryString += (
              counter < keys.length - 1
                ? '&'
                : ''
            );
          } else if (queryParams[keys[counter]] instanceof Date) {
            queryString += `${keys[counter]}=${queryParams[keys[counter]].toISOString()}${counter < keys.length - 1 ? '&' : ''}`;
          } else if (
            typeof queryParams[keys[counter]] === 'string' ||
            typeof queryParams[keys[counter]] === 'number' ||
            typeof queryParams[keys[counter]] === 'boolean'
          ) {// Primitives
            queryString += `${keys[counter]}=${queryParams[keys[counter]]}${counter < keys.length - 1 ? '&' : ''}`;
          }
        }
      }

      if (!!queryString.length) {
        queryString = '?' + queryString;
      }
    }

    return queryString;
  }
}
