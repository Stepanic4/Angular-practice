import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalstorageService} from './localstorage.service';

@Injectable()

export class Interceptor implements HttpInterceptor {
  constructor(private localstorageService: LocalstorageService) {
  }

  /**
   * Method that we need to implement due to the HttpInterceptor interface
   * @param request { HttpRequest<Any> }
   * @param next { HttpHandler }
   * @returns { Observable<HttpEvent<Any>> }
   */
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest: HttpRequest<any> = request.clone({
      withCredentials: true,
      headers: new HttpHeaders({
        Authorization: `Bearer: ${this.localstorageService.get('token')}`,
        'Content-Type': request.headers.get('Content-Type') || 'application/json'
      })
    });

    // Returning the changed request
    return next.handle(clonedRequest);
  }
}
