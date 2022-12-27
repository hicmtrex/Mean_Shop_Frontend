import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent implements OnInit {
  collapseShow = 'hidden';
  date = new Date().getFullYear();
  constructor() {}

  ngOnInit() {}
  toggleCollapseShow(classes: any) {
    this.collapseShow = classes;
  }
}
