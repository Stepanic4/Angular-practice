import {Component, OnInit} from '@angular/core';
import { ClockService } from '../../common/services/clock.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: [ './main-page.component.scss' ]
})

export class MainPageComponent implements OnInit {

  public time;

  constructor(private clockService: ClockService) {}

  public ngOnInit() {
    this.time = this.clockService.getCurrentTime();
  }
}
