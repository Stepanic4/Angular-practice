import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs/internal/Observable';
import { HttpHelper } from '../helpers/http.helper';
import { ErrorHelper } from '../helpers/error.helper';
import { KeyValueInterface } from '../interfaces/key-value.interface';
import { ParserType } from '../types/parser.type';

@Injectable({ providedIn: 'root' })

export class HttpService {
  constructor(private http: HttpClient) {}

  /**
   * GET request
   * @param url { String }
   * @param parser { ParserType<R, T> }
   * @param queryParams { KeyValueInterface<String> }
   * @param requestParams { KeyValueInterface<Any> }
   * @returns { Observable<T> }
   */
  public get<R, T>(
    url: string,
    parser?: ParserType<R, T>,
    queryParams: KeyValueInterface<string> = {},
    requestParams: KeyValueInterface<any> = {}
  ): Observable<T> {
    return this.sendRequest<R, T>(
      this.http.get<R>(`${url}${HttpHelper.createQueryString(queryParams)}`, requestParams),
      parser
    );
  }

  /**
   * POST request
   * @param url { String }
   * @param body { KeyValueInterface<Any> }
   * @param parser { ParserType<R, T> }
   * @param queryParams { KeyValueInterface<String> }
   * @param requestParams { KeyValueInterface<Any> }
   * @returns { Observable<T> }
   */
  public post<R, T>(
    url: string,
    body: KeyValueInterface<any>,
    parser?: ParserType<R, T>,
    queryParams: KeyValueInterface<string> = {},
    requestParams: KeyValueInterface<any> = {}
  ): Observable<T> {
    return this.sendRequest<R, T>(
      this.http.post<R>(`${url}${HttpHelper.createQueryString(queryParams)}`, body, requestParams),
      parser
    );
  }

  /**
   * PUT request
   * @param url { String }
   * @param body { KeyValueInterface<Any> }
   * @param parser { ParserType<R, T> }
   * @param queryParams { KeyValueInterface<String> }
   * @param requestParams { KeyValueInterface<Any> }
   * @returns { Observable<T> }
   */
  public put<R, T>(
    url: string,
    body: KeyValueInterface<any>,
    parser?: ParserType<R, T>,
    queryParams: KeyValueInterface<string> = {},
    requestParams: KeyValueInterface<any> = {}
  ): Observable<T> {
    return this.sendRequest<R, T>(
      this.http.put<R>(`${url}${HttpHelper.createQueryString(queryParams)}`, body, requestParams),
      parser
    );
  }

  /**
   * PATCH request
   * @param url { String }
   * @param body { KeyValueInterface<Any> }
   * @param parser { ParserType<R, T> }
   * @param queryParams { KeyValueInterface<String> }
   * @param requestParams { KeyValueInterface<Any> }
   * @returns { Observable<T> }
   */
  public patch<R, T>(
    url: string,
    body: KeyValueInterface<any>,
    parser?: ParserType<R, T>,
    queryParams: KeyValueInterface<string> = {},
    requestParams: KeyValueInterface<any> = {}
  ): Observable<T> {
    return this.sendRequest<R, T>(
      this.http.patch<R>(`${url}${HttpHelper.createQueryString(queryParams)}`, body, requestParams),
      parser
    );
  }

  /**
   * DELETE request
   * @param url { String }
   * @param parser { ParserType<R, T> }
   * @param queryParams { KeyValueInterface<String> }
   * @param requestParams { KeyValueInterface<Any> }
   * @returns { Observable<T> }
   */
  public delete<R, T>(
    url: string,
    parser?: ParserType<R, T>,
    queryParams: KeyValueInterface<string> = {},
    requestParams: KeyValueInterface<any> = {}
  ): Observable<T> {
    return this.sendRequest<R, T>(
      this.http.delete<R>(`${url}${HttpHelper.createQueryString(queryParams)}`, requestParams),
      parser
    );
  }

  /**
   * Head request
   * @param url { String }
   * @param parser { ParserType<R, T> }
   * @param queryParams { KeyValueInterface<String> }
   * @param requestParams { KeyValueInterface<Any> }
   * @returns { Observable<T> }
   */
  public head<R, T>(
    url: string,
    parser?: ParserType<R, T>,
    queryParams: KeyValueInterface<string> = {},
    requestParams: KeyValueInterface<any> = {}
  ): Observable<T> {
    return this.sendRequest<R, T>(
      this.http.head<R>(`${url}${HttpHelper.createQueryString(queryParams)}`, requestParams),
      parser
    );
  }

  /**
   * Options request
   * @param url { String }
   * @param parser { ParserType<R, T> }
   * @param queryParams { KeyValueInterface<String> }
   * @param requestParams { KeyValueInterface<Any> }
   * @returns { Observable<T> }
   */
  public options<R, T>(
    url: string,
    parser?: ParserType<R, T>,
    queryParams: KeyValueInterface<string> = {},
    requestParams: KeyValueInterface<any> = {}
  ): Observable<T> {
    return this.sendRequest<R, T>(
      this.http.head<R>(`${url}${HttpHelper.createQueryString(queryParams)}`, requestParams),
      parser
    );
  }

  /**
   * Request runner
   * @param method { Observable<R> }
   * @param parser { ParserType<R, T> }
   * @returns { Observable<T> }
   */
  private sendRequest<R, T>(
    method: Observable<R>,
    parser: ParserType<R, T> = (data: any): T => data as T
  ): Observable<T> {
    return method.pipe<T, T>(
      map<R, T>(parser),
      catchError<T, never>((err: HttpErrorResponse): Observable<never> => {
        return throwError(ErrorHelper.createErrorModelFromHttpError(err));
      })
    );
  }
}
