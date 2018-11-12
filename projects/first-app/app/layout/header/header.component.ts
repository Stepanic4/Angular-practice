import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public menuItems: string[] = [
    'Main content',
    'Contacts',
    'Sound'
  ];
  public column: boolean;

  constructor() {
  }

  public ngOnInit() {
  }

  public toggle(event: MouseEvent): void {
    event.stopPropagation();
    this.column = !this.column;
  }

}
