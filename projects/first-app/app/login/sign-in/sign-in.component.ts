import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {

  public profileForm = new FormGroup({

    useremail: new FormControl('', [
      Validators.required,
      Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,5})+$'),
      Validators.minLength(5),
      Validators.maxLength(70)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25),
    ])
  });

  constructor() { }

  public ngOnInit() {
  }

  public onSubmit() {
    console.warn(this.profileForm.value);
  }
}
