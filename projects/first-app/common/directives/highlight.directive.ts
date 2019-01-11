import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({ selector: '[appHighlight]' })

export class HighlightDirective {
  constructor(private elementRef: ElementRef) {}

  /**
   * Primary color, will be given from the outside via [appHighlight]="someColor"
   * @type { String }
   */
  @Input('appHighlight')
  public color: string;

  /**
   * Default color that may be given from the outside
   * @type { String }
   */
  @Input()
  public defaultColor: string;

  /**
   * Method will be executed by the 'onmouseenter' event of the element with directive
   * @returns { void }
   */
  @HostListener('mouseenter')
  public onMouseEnter() {
    this.changeColor(this.color);
  }

  /**
   * Method will be executed by the 'onmouseleave' event of the element with directive
   * @returns { void }
   */
  @HostListener('mouseleave')
  public onMouseLeave() {
    this.changeColor('');
  }

  /**
   * Method that changes element's bg color to given one
   * @param color { String }
   * @returns { void }
   */
  private changeColor(color: string) {
    this.elementRef.nativeElement.style.color = color || this.defaultColor || null;
  }
}
