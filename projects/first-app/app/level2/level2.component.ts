import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { PageLeaveCheckInterface } from '../../common/interfaces/page-leave-check.interface';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-level2',
  templateUrl: './level2.component.html',
  styleUrls: [ './level2.component.scss' ]
})

export class Level2Component implements OnInit, PageLeaveCheckInterface {
  /**
   * Saved data from the router that related to component's route
   * @type { Data }
   */
  public data: Data;

  private canLeave: boolean;

  constructor(private activatedRoute: ActivatedRoute) {
    setTimeout(
      (): void => {
        this.canLeave = true;
      },
      5000
    );
  }

  /**
   * Method will be called by Angular when component will be initialized
   * @returns { void }
   */
  public ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      (data: Data): void => {
        this.data = data;
      }
    );
  }

  public pageLeaveCheck(): Observable<boolean> {
    return of<boolean>(this.canLeave);
  }
}
