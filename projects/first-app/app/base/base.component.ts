import { Component } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import { UserModel } from '../../common/models/user.model';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: [ './base.component.scss' ]
})

export class BaseComponent {
  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe(
      (users: UserModel[]): void => {
        console.log(users);
      }
    );
  }
}
