import { KeyValueInterface } from '../interfaces/key-value.interface';

export class JsonHelper {
  public static parse(json: string): KeyValueInterface<any> {
    try {
      return JSON.parse(json);
    } catch (e) {
      return {};
    }
  }

  public static stringify(data: KeyValueInterface<any>): string {
    try {
      return JSON.stringify(data);
    } catch (e) {
      return '';
    }
  }
}
