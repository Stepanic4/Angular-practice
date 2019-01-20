import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from '../services/user.service';
import { Observer } from 'rxjs/internal/types';
import { ErrorModel } from '../models/error.model';

@Injectable({ providedIn: 'root' })

export class UnauthorizedResolver implements Resolve<Observable<void>> {
  constructor(private router: Router,
              private userService: UserService) {}

  public resolve(): Observable<void> {
    return Observable.create((observer: Observer<void>): void => {
      if (this.userService.isLogged()) {
        observer.error(new ErrorModel<string, number>({
          description: 'This route allowed only for guest users!',
          data: 'asdasdasdasd',
          error: 100500
        }));
        this.router.navigateByUrl('/');
      } else {
        observer.next(void 0);
        observer.complete();
      }
    });
  }
}
