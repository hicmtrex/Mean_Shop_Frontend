import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Input() page!: number;
  @Input() pages: number = 1;

  array: any = [...Array(this.pages).keys()];

  constructor() {
    console.log(this.pages);
  }
}
