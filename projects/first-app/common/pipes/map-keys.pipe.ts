import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mapKeys' })

export class MapKeysPipe implements PipeTransform {
  /**
   * Method implemented due to the interface contract
   * @param map { Map<String, Any> }
   * @returns { String[] }
   */
  public transform(map: Map<string, any> = new Map<string, any>()): string[] {
    const keys: string[] = [];
    const iterator: IterableIterator<string> = map.keys();
    let item: IteratorResult<string> = iterator.next();

    while (!!item.value && !item.done) {// While we have the next item in the Map keys array
      keys.push(item.value);
      item = iterator.next();
    }

    return keys;
  }
}
