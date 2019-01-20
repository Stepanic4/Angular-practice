import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable({ providedIn: 'root' })

export class PageLeaveGuard implements CanDeactivate<any> {
  public canDeactivate(component: any): Observable<boolean> {
    return (
      component.pageLeaveCheck instanceof Function
        ? component.pageLeaveCheck()
        : of<boolean>(false)
    );
  }
}
