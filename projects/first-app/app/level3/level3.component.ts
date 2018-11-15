import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-level3',
  templateUrl: './level3.component.html',
  styleUrls: [ './level3.component.scss' ]
})

export class Level3Component implements OnInit {
  /**
   * Saved param from the route
   * @type { String }
   */
  public param: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {}

  /**
   * Method will be called by Angular when component will be initialized
   * @returns { void }
   */
  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params): void => {
        if (!!params.someItemID) {
          this.param = params.someItemID;
        } else {
          delete this.param;
        }
      }
    );
  }

  /**
   * Handler for the onParam event from the EventEmitter of the ChildComponent
   * @param param { String }
   * @returns { void }
   */
  public onParamHandler(param: string): void {
    this
      .router
      .navigateByUrl(this.router.url.replace(this.param, param))
      .then((value: boolean): void => {
        console.log(`Level3Component->onParamHandler: Successful redirect, returned value is ${value}`);
      })
      .catch((reason: any): void => {
        console.error(`Level3Component->onParamHandler: Redirect failed`, reason);
      });
  }
}
