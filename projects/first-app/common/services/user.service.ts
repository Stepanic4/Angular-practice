import { EventEmitter, Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })

export class UserService {
  /**
   * Method will be used to clone model. This prevents changing object by reference.
   * Later we'll move this method to another place.
   * Important! This method can't be called like this.cloneUserModel(user) !!!
   * Static methods are allowed to call only like UserService.cloneUserModel(user)
   * They can't call non-static methods and properties
   * Read TypeScript docs about static properties: https://www.typescriptlang.org/docs/handbook/classes.html
   * @param model { UserModel }
   * @returns { UserModel }
   */
  public static cloneUserModel(model: UserModel): UserModel {
    const params: UserInterface = {} as UserInterface;
    params.id = model.id;
    params.name = model.name;
    return new UserModel(params);
  }

  /**
   * Property to subscribe from any other entity: component, service, etc
   * @type { EventEmitter<UserModel> }
   */
  public onUserChange: EventEmitter<UserModel> = new EventEmitter<UserModel>();

  /**
   * Saved copy of user model. Won't be available from the outside.
   * All entities that require user model should get it via the onUserChange property over the subscription
   */
  private user: UserModel;

  constructor() {
    // Fake user model "downloading"
    this.getUser()
      .then((user: UserModel): void => {
        this.sendNewUserToSubscribers(user);
      });
  }

  /**
   * Method emits the download process of user model from the server
   * @returns { Promise<UserModel> }
   * @async
   */
  public async getUser(): Promise<UserModel> {
    return new Promise<UserModel>((resolve: Function): void => {
      setTimeout(
        (): void => resolve(new UserModel({
          id: 'someID',
          name: 'User#1'
        })),
        4000
      );
    });
  }

  /**
   * Method that any other entity (component, service, etc) should use when they want to change existing user model
   * Method will be async to emit the sending (to the server) process to save the new model
   * @param changedUserModel { UserModel }
   * @returns { Promise<UserModel> }
   * @async
   */
  public async changeUser(changedUserModel: UserModel): Promise<UserModel> {
    return new Promise<UserModel>((resolve: Function, reject: Function): void => {
      if (changedUserModel.id !== this.user.id || changedUserModel.name !== this.user.name) {
        setTimeout(// Timer makes logic async to emit the HTTP request
          (): void => {
            // Removing reference from the entity that gave model in the changedUserModel param
            // Then calling the method that saves new model and notifies EventEmitter subscribers
            const newUser: UserModel = UserService.cloneUserModel(changedUserModel);
            resolve(newUser);
            this.sendNewUserToSubscribers(newUser);
          },
          3000
        );
      } else {
        reject(new Error('Models are equal'));
      }
    });
  }

  /**
   * Method saves given model and notifies subscribers about model changing
   * Method is private and shouldn't be called from the outside
   * @param user { UserModel }
   * @returns { void }
   */
  private sendNewUserToSubscribers(user: UserModel): void {
    this.user = user;
    this.onUserChange.emit(user);
  }
}
