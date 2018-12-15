import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs/internal/types';
import { UserHelper } from '../helpers/user.helper';
import { KeyValueInterface } from '../interfaces/key-value.interface';
import { UserModel } from '../models/user.model';

@Injectable({ providedIn: 'root' })

export class UserService {
  /**
   * Subject for subscribe from the outside
   * @type { Subject<UserModel> }
   */
  public userSubject: Subject<UserModel> = new Subject<UserModel>();

  /**
   * Saved copy of user model. Won't be available from the outside.
   * All entities that require user model should get it via the onUserChange property over the subscription
   */
  private user: UserModel;

  /**
   * Behavior subject for user property
   * @type { BehaviorSubject<UserModel> }
   */
  private userBS: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(this.user);

  constructor(private http: HttpClient) {}

  /**
   * Method emits the download process of user model from the server
   * @returns { Promise<UserModel> }
   * @async
   */
  public getUsers(): Observable<UserModel[]> {
    return Observable.create((observer: Observer<UserModel[]>): void => {
      this.http.get<KeyValueInterface<any>[]>('https://jsonplaceholder.typicode.com/users', {
        headers: {
          'Content-type': 'multipart/form-data',
          'Accept': 'text/html'
        }
      }).subscribe(
        (data: KeyValueInterface<any>[]): void => {
          const users: UserModel[] = data.map<UserModel>(
            (u: KeyValueInterface<any>): UserModel => UserHelper.createUserModel(u)
          );
          observer.next(users);
        },
        (error: HttpErrorResponse): void => observer.error(error),
        (): void => observer.complete()
      );
    });
  }

  /**
   * Method emits the download process of user model from the server
   * @returns { Promise<UserModel> }
   * @async
   */
  public getUser(id: string): Observable<UserModel> {
    return Observable.create((observer: Observer<UserModel>): void => {
      this.http.get<KeyValueInterface<any> >(`https://jsonplaceholder.typicode.com/users${id}`).subscribe(
        (data: KeyValueInterface<any>): void => observer.next(UserHelper.createUserModel(data)),
        (error: HttpErrorResponse): void => observer.error(error),
        (): void => observer.complete()
      );
    });
  }

  /**
   * Test method to change saved user model and send new model to subscribers
   * @param user { UserModel }
   */
  public dispatch(user: UserModel): void {
    this.sendNewUserToSubscribers(user);
  }

  /**
   * Method saves given model and notifies subscribers about model changing
   * Method is private and shouldn't be called from the outside
   * @param user { UserModel }
   * @returns { void }
   */
  private sendNewUserToSubscribers(user: UserModel): void {
    // Saving new value
    this.user = user;

    // Sending update to subscribers via BehaviorSubject
    this.userBS.next(this.user);

    // Sending update to subscribers via Subject
    this.userSubject.next(this.user);
  }
}
