import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationParamsInterface } from '../../common/interfaces/pagination-params.interface';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: [ './pagination.component.scss' ]
})

export class PaginationComponent {
  @Input('params')
  public set paramsSetter(params: PaginationParamsInterface) {
    if (!!params) {
      this.params = params;
      this.indexes = this.calculate(params);
    }
  }

  @Output()
  public onChange: EventEmitter<number> = new EventEmitter<number>();

  public params: PaginationParamsInterface;

  public indexes: number[];

  public onItemClickHandler(index: number): void {
    this.onChange.emit(index);
  }

  private calculate(params: PaginationParamsInterface): number[] {
    const result: number[] = [];

    let startIndex: number = 1;

    if (
      params.current > (Math.floor(this.params.controlsCount / 2)) &&
      params.current < Math.floor(params.total / params.perPage) - (Math.floor(this.params.controlsCount / 2))
    ) {
      startIndex = params.current - Math.floor(params.controlsCount / 2);
    } else if (params.current > Math.floor(params.total / params.perPage) - (Math.ceil(this.params.controlsCount / 2))) {
      startIndex = (params.total / params.perPage) - params.controlsCount + 1;
    }

    for (let i: number = startIndex; i < startIndex + params.controlsCount; i ++) {
      result.push(i);
    }

    return result;
  }
}
