import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../common/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  public user;
  public formSubmited: boolean;

  constructor(
    private userModel: UserService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  public ngOnInit() {
    this.formSubmited = false;
    const userId: any = this.activatedRoute.snapshot.paramMap.get('id');

    this.userModel.getUser(userId).subscribe(
      (user): void => {
        this.user = user;
        // Todo: Handle user list
      },
      (error: HttpErrorResponse): void => {
        console.error(error);
        // Todo: Handle error
      }
    );
  }

  public onSubmited() {
    this.formSubmited = true;
  }

  public goBack() {
    this.location.back();
  }

}
