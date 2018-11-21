import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { KeyValueInterface } from '../interfaces/key-value.interface';
import { PostModel } from '../models/post.model';
import { Observer } from 'rxjs/internal/types';
import { PostHelper } from '../helpers/post.helper';

@Injectable({ providedIn: 'root' })

export class PostService {
  constructor(private http: HttpClient) {}

  /**
   * Method loads data from fake API and returns typed PostModel items through the Observable object
   * @returns { Observable<PostModel[]> }
   * @async
   */
  public getPosts(): Observable<PostModel[]> {
    return Observable.create((observer: Observer<PostModel[]>): void => {
      this.http.get<KeyValueInterface<any>[]>('https://jsonplaceholder.typicode.com/posts').subscribe(
        (data: KeyValueInterface<any>[]): void => observer.next(data.map<PostModel>(PostHelper.createPostModelFromServerData)),
        (error: HttpErrorResponse): void => observer.error(error),
        (): void => observer.complete()
      );
    });
  }
}
