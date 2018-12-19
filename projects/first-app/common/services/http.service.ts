import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs/internal/types';
import { JsonHelper } from '../helpers/json.helper';
import { HttpHelper } from '../helpers/http.helper';
import { ErrorInterface } from '../interfaces/error.interface';
import { KeyValueInterface } from '../interfaces/key-value.interface';
import { ErrorModel } from '../models/error.model';

@Injectable({ providedIn: 'root' })

export class HttpService {
  constructor(private http: HttpClient) {}

  /**
   * GET request
   * @param url { String }
   * @param queryParams { KeyValueInterface<String> }
   * @param requestParams { Any }
   * @returns { Observable<T> }
   * @async
   */
  public get<T>(url: string, queryParams: KeyValueInterface<string> = {}, requestParams: any = {}): Observable<T> {
    return this.sendRequest(this.http.get<T>(
      `${url}${HttpHelper.createQueryString(queryParams)}`,
      requestParams
    ));
  }

  /**
   * POST request
   * @param url { String }
   * @param body { KeyValueInterface<Any> }
   * @param queryParams { KeyValueInterface<String> }
   * @param requestParams { Any }
   * @returns { Observable<T> }
   * @async
   */
  public post<T>(
    url: string,
    body: KeyValueInterface<any>,
    queryParams: KeyValueInterface<string> = {},
    requestParams: any = {}
  ): Observable<T> {
    return this.sendRequest(this.http.post<T>(
      `${url}${HttpHelper.createQueryString(queryParams)}`,
      body,
      requestParams
    ));
  }


  /**
   * PUT request
   * @param url { String }
   * @param body { KeyValueInterface<Any> }
   * @param queryParams { KeyValueInterface<String> }
   * @param requestParams { Any }
   * @returns { Observable<T> }
   * @async
   */
  public put<T>(
    url: string,
    body: KeyValueInterface<any>,
    queryParams: KeyValueInterface<string> = {},
    requestParams: any = {}
  ): Observable<T> {
    return this.sendRequest(this.http.put<T>(
      `${url}${HttpHelper.createQueryString(queryParams)}`,
      body,
      requestParams
    ));
  }

  /**
   * PATCH request
   * @param url { String }
   * @param body { KeyValueInterface<Any> }
   * @param queryParams { KeyValueInterface<String> }
   * @param requestParams { Any }
   * @returns { Observable<T> }
   * @async
   */
  public patch<T>(
    url: string,
    body: KeyValueInterface<any>,
    queryParams: KeyValueInterface<string> = {},
    requestParams: any = {}
  ): Observable<T> {
    return this.sendRequest(this.http.patch<T>(
      `${url}${HttpHelper.createQueryString(queryParams)}`,
      body,
      requestParams
    ));
  }

  /**
   * DELETE request
   * @param url { String }
   * @param queryParams { KeyValueInterface<Any> }
   * @param requestParams { Any }
   * @returns { Observable<T> }
   * @async
   */
  public delete<T>(
    url: string,
    queryParams: KeyValueInterface<string> = {},
    requestParams: any = {}
  ): Observable<T> {
    return this.sendRequest(this.http.delete<T>(
      `${url}${HttpHelper.createQueryString(queryParams)}`,
      requestParams
    ));
  }

  /**
   * Request runner
   * @param method { Observable<HttpEvent<T>> }
   * @returns { Observable<T> }
   * @async
   */
  private sendRequest<T = any>(method: Observable<HttpEvent<T>>): Observable<T> {
    return Observable.create((observer: Observer<HttpEvent<T>>): void => {
      method.subscribe(
        (data: HttpEvent<T>): void => {
          observer.next(data);
        },
        (error: HttpErrorResponse): void => {
          const parsedErrorBody: KeyValueInterface<any> = JsonHelper.parse(error.error);

          observer.error(new ErrorModel<void, HttpErrorResponse>({
            description: parsedErrorBody.description,
            error
          } as ErrorInterface<void, HttpErrorResponse>));
        },
        (): void => observer.complete()
      );
    });
  }
}
