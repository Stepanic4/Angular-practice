import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs/internal/types';

@Injectable({ providedIn: 'root' })

export class BaseGuard implements CanActivate {
  constructor(private userService: UserService) {}

  public canActivate(): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>): void => {
      this.userService.getUser('1').subscribe(
        (): void => {
          observer.next(true);
          observer.complete();
        },
        (): void => {
          observer.next(true);
          observer.complete();
        }
      );
    });
  }
}
