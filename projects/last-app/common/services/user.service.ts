import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpService } from './http.service';
import { UserHelper } from '../helpers/user.helper';
import { UserModel } from '../models/user.model';
import { KeyValueInterface } from '../interfaces/key-value.interface';

@Injectable({ providedIn: 'root' })

export class UserService {
  /**
   * Saved copy of user model. Won't be available from the outside.
   * All entities that require user model should get it via the onUserChange property over the subscription
   */
  private user: UserModel = new UserModel({
    id: '100500',
    name: 'User#1',
    externalAccounts: []
  });

  /**
   * Behavior subject for user property
   * @type { BehaviorSubject<UserModel> }
   */
  private userBS: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(this.user);

  constructor(private http: HttpService) {}

  public getStateSubscription(): Observable<UserModel> {
    return this.userBS.asObservable();
  }

  public isLogged(): boolean {
    return !!this.user;
  }

  /**
   * Method emits the download process of user model from the server
   * @returns { Promise<UserModel> }
   * @async
   */
  public getUsers(): Observable<UserModel[]> {
    return this.http.get<KeyValueInterface<any>[], UserModel[]>(
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
    return this.http.get<KeyValueInterface<any>, UserModel>(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      UserHelper.createUserModel
    );
  }

  /**
   * Test method to change saved user model and send new model to subscribers
   * @param user { UserModel }
   */
  public dispatch(user: UserModel): void {
    this.next(user);
  }

  /**
   * Method saves given model and notifies subscribers about model changing
   * Method is private and shouldn't be called from the outside
   * @param user { UserModel }
   * @returns { void }
   */
  private next(user: UserModel): void {
    // Saving new value
    this.user = user;

    // Sending update to subscribers via BehaviorSubject
    this.userBS.next(this.user);
  }
}
