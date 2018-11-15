import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-level2',
  templateUrl: './level2.component.html',
  styleUrls: [ './level2.component.scss' ]
})

export class Level2Component implements OnInit {
  /**
   * Saved data from the router that related to component's route
   * @type { Data }
   */
  public data: Data;

  constructor(private activatedRoute: ActivatedRoute) {}

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
}
