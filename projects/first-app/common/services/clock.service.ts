import { Observable , interval} from 'rxjs';
import { map } from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })

export class ClockService {

  private clock: Observable<Date>;

  constructor() {
    this.clock = interval(1000).pipe(map(() => new Date())
    );
  }
  public getCurrentTime() {
    return this.clock;
  }
}
