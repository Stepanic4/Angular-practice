import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observer } from 'rxjs/internal/types';
import { Observable } from 'rxjs/internal/Observable';
import { PostHelper } from '../helpers/post.helper';
import { KeyValueInterface } from '../interfaces/key-value.interface';
import { PostModel } from '../models/post.model';

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

  public getPost(id: string): Observable<PostModel> {
    return Observable.create((observer: Observer<PostModel>): void => {
      this.http.get<KeyValueInterface<any>>(`https://jsonplaceholder.typicode.com/posts/${id}`).subscribe(
        (data: KeyValueInterface<any>): void => observer.next(PostHelper.createPostModelFromServerData(data)),
        (error: HttpErrorResponse): void => console.error(error),
        (): void => observer.complete()
      );
    });
  }
}
