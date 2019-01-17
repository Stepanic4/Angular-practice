import { Component } from '@angular/core';
import { UserService } from '../../../common/services/user.service';
import { UserModel } from '../../../common/models/user.model';
import { UserHelper } from '../../../common/helpers/user.helper';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  templateUrl: './lazy-loaded.component.html',
  styleUrls: [ './lazy-loaded.component.scss' ]
})

export class LazyLoadedComponent {
  public user: UserModel;

  public backup: UserModel;

  public form: FormGroup = this.formBuilder.group({
    name: new FormControl('', [ Validators.maxLength(4) ])
  });

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
    this
      .userService
      .getStateSubscription()
      .pipe<UserModel>(filter<UserModel>((u: UserModel): boolean => !!u))
      .subscribe((user: UserModel): void => {
        this.user = user;
        this.reset();
      });
  }

  public onInputHandler(fieldName: keyof UserModel, value: string): void {
    switch (fieldName) {
      case 'name':
        this.backup.name = value;
        break;
    }
  }

  public reset(): void {
    this.backup = UserHelper.cloneUserModel(this.user);
  }

  public submit(): void {
    console.log(this.form.value);
  }
}

