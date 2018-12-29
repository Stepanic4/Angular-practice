import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpService } from './http.service';
import { UserHelper } from '../helpers/user.helper';
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

  constructor(private http: HttpService) {}

  /**
   * Method emits the download process of user model from the server
   * @returns { Promise<UserModel> }
   * @async
   */
  public getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(
      'https://jsonplaceholder.typicode.com/users',
      UserHelper.createUserModelArray
    );
  }

  /**
   * Method emits the download process of user model from the server
   * @returns { Promise<UserModel> }
   * @async
   */
  public getUser(id: string): Observable<UserModel> {
    return this.http.get<UserModel>(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      UserHelper.createUserModel
    );
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
