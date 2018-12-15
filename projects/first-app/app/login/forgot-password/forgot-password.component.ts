import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotForm = new FormGroup({
    useremail: new FormControl ('', [
      Validators.required,
      Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,5})+$'),
      Validators.minLength(5),
      Validators.maxLength(70)
    ])
  });

  constructor() { }

  public ngOnInit() {

  }

}
