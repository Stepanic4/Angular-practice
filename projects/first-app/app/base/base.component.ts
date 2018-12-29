import { Component } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import { UserModel } from '../../common/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorModel } from '../../common/models/error.model';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: [ './base.component.scss' ]
})

export class BaseComponent {
  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe((users: UserModel[]): void => {
      console.log(users);

      this.userService.getUser(users[0].id).subscribe(
        (user: UserModel): void => {
          console.log(user);
        },
        (error: ErrorModel<void, HttpErrorResponse>): void => {
          console.error(error);
        }
      );
    });
  }
}
