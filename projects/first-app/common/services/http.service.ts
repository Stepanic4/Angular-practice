import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs/internal/types';
import { HttpHelper } from '../helpers/http.helper';
import { KeyValueInterface } from '../interfaces/key-value.interface';
import { ParserType } from '../types/parser.type';
import { ErrorHelper } from '../helpers/error.helper';

@Injectable({ providedIn: 'root' })

export class HttpService {
  constructor(private http: HttpClient) {}

  /**
   * GET request
   * @param url { String }
   * @param queryParams { KeyValueInterface<String> }
   * @param parser { ParserType<T> }
   * @param requestParams { Any }
   * @returns { Observable<T> }
   * @async
   */
  public get<T>(
    url: string,
    parser?: ParserType<T>,
    queryParams: KeyValueInterface<string> = {},
    requestParams: any = {}
  ): Observable<T> {
    return this.sendRequest<T>(
      this.http.get<T>(`${url}${HttpHelper.createQueryString(queryParams)}`, requestParams),
      parser
    );
  }

  /**
   * POST request
   * @param url { String }
   * @param body { KeyValueInterface<Any> }
   * @param parser { ParserType<T> }
   * @param queryParams { KeyValueInterface<String> }
   * @param requestParams { Any }
   * @returns { Observable<T> }
   * @async
   */
  public post<T>(
    url: string,
    body: KeyValueInterface<any>,
    parser?: ParserType<T>,
    queryParams: KeyValueInterface<string> = {},
    requestParams: any = {}
  ): Observable<T> {
    return this.sendRequest(
      this.http.post<T>(
        `${url}${HttpHelper.createQueryString(queryParams)}`,
        body,
        requestParams
      ),
      parser
    );
  }


  /**
   * PUT request
   * @param url { String }
   * @param body { KeyValueInterface<Any> }
   * @param parser { ParserType<T> }
   * @param queryParams { KeyValueInterface<String> }
   * @param requestParams { Any }
   * @returns { Observable<T> }
   * @async
   */
  public put<T>(
    url: string,
    body: KeyValueInterface<any>,
    parser?: ParserType<T>,
    queryParams: KeyValueInterface<string> = {},
    requestParams: any = {}
  ): Observable<T> {
    return this.sendRequest(
      this.http.put<T>(
        `${url}${HttpHelper.createQueryString(queryParams)}`,
        body,
        requestParams
      ),
      parser
    );
  }

  /**
   * PATCH request
   * @param url { String }
   * @param body { KeyValueInterface<Any> }
   * @param parser { ParserType<T> }
   * @param queryParams { KeyValueInterface<String> }
   * @param requestParams { Any }
   * @returns { Observable<T> }
   * @async
   */
  public patch<T>(
    url: string,
    body: KeyValueInterface<any>,
    parser?: ParserType<T>,
    queryParams: KeyValueInterface<string> = {},
    requestParams: any = {}
  ): Observable<T> {
    return this.sendRequest(
      this.http.patch<T>(
        `${url}${HttpHelper.createQueryString(queryParams)}`,
        body,
        requestParams
      ),
      parser
    );
  }

  /**
   * DELETE request
   * @param url { String }
   * @param parser { ParserType<T> }
   * @param queryParams { KeyValueInterface<Any> }
   * @param requestParams { Any }
   * @returns { Observable<T> }
   * @async
   */
  public delete<T>(
    url: string,
    parser?: ParserType<T>,
    queryParams: KeyValueInterface<string> = {},
    requestParams: any = {}
  ): Observable<T> {
    return this.sendRequest(
      this.http.delete<T>(
        `${url}${HttpHelper.createQueryString(queryParams)}`,
        requestParams
      ),
      parser
    );
  }

  /**
   * Request runner
   * @param method { Observable<HttpEvent<T>> }
   * @param parser { ParserType<T> }
   * @returns { Observable<T> }
   * @async
   */
  private sendRequest<T>(
    method: Observable<HttpEvent<T>>,
    parser: ParserType<T> = (data: any): T => data
  ): Observable<T> {
    return Observable.create((observer: Observer<T>): void => {
      method.subscribe(
        (data: HttpEvent<any>): void => observer.next(parser(data)),
        (error: HttpErrorResponse): void => observer.error(ErrorHelper.createErrorModelFromHttpError(error)),
        (): void => observer.complete()
      );
    });
  }
}
