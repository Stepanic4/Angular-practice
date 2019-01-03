import { Component, OnInit } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserModel } from '../../common/models/user.model';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: [ './about-us.component.scss' ]
})

export class AboutUsComponent implements OnInit {

  public myUsers: UserModel[];
  public  searchStr: '';

  constructor(private userModel: UserService) {

  }

  public ngOnInit() {
    this.userModel.getUsers().subscribe(
      (users: UserModel[]): void => {
        console.log(users);
        this.myUsers = users;
        // Todo: Handle user list
      },
      (error: HttpErrorResponse): void => {
        console.error(error);
        // Todo: Handle error
      }
    );
  }
}

