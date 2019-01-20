import { Observable } from 'rxjs/internal/Observable';

export interface PageLeaveCheckInterface {
  pageLeaveCheck(): Observable<boolean>;
}
