import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: [ './child.component.scss' ]
})

export class ChildComponent {
  /**
   * Event will be emitted to give the new param value to parent component
   * @type { EventEmitter<UserModel> }
   */
  @Output()
  public onParam: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Method emits event for the parent component to give the new param value
   * @param param { String }
   * @returns { void }
   */
  public changeParamValue(param: string = ''): void {
    if (!!param.length) {
      this.onParam.emit(param);
    }
  }
}
