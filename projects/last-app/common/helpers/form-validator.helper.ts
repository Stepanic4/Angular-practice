import { AbstractControl } from '@angular/forms';
import { KeyValueInterface } from '../interfaces/key-value.interface';

export class FormValidatorHelper {
  public static email(input: AbstractControl): KeyValueInterface<boolean> | null {
    if (!input || input.value === null) {
      return { email: true };
    }

    const re: RegExp = new RegExp(''
      + /^(([^<>()\[\]\\.,;:\s@'`"]+(\.[^<>()\[\]\\.,;:\s@'`"]+)*)|(".+"))@/.source
      + /((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.source
    );

    return (
      input.value.match(re)
        ? null
        : { email: true }
    );
  }
}
