import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from '../services/user.service';
import { Observer } from 'rxjs/internal/types';

@Injectable({ providedIn: 'root' })

export class BaseResolver implements Resolve<void> {
  constructor(private userService: UserService) {}

  public resolve(): Observable<void> {
    return Observable.create((observer: Observer<void>): void => {
      this.userService.getUser('1').subscribe(
        (data): void => {
          console.log(data);
          observer.next(void 0);
          observer.complete();
        },
        (error): void => {
          console.log(error);
          observer.next(void 0);
          observer.complete();
        }
      );
    });
  }
}
