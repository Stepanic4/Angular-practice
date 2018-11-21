import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  public isChecked: boolean = false;

  constructor() { }

  public ngOnInit() {
  }

  @Input() public checkValue(event: boolean) {
    console.log(event);
  }

}
