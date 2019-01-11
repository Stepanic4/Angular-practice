import { Component, OnInit } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserModel } from '../../common/models/user.model';
import { PageLeaveCheckInterface } from '../../common/interfaces/page-leave-check.interface';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: [ './about-us.component.scss' ]
})

export class AboutUsComponent implements OnInit, PageLeaveCheckInterface {

  public myUsers: UserModel[];
  public  searchStr: '';
  private canLeave: boolean;

  public pageLeaveCheck(): Observable<boolean> {
    return of<boolean>(this.canLeave);
  }

  public changeCanLeave(state: boolean = !this.canLeave): void {
    this.canLeave = state;
  }

  constructor(private userModel: UserService) {

  }

  public ngOnInit() {
    this.userModel.getUsers().subscribe(
      (users: UserModel[]): void => {
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

