import { Component, OnInit } from '@angular/core';
import {
  faDashboard,
  faUsers,
  faWaveSquare,
  faBoxes,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  collapseShow = 'hidden';

  navLinks = [
    {
      name: 'Dashboard',
      link: '/dashboard',
      icon: faDashboard,
    },
    {
      name: 'Producs List',
      link: '/dashboard/products-list',
      icon: faWaveSquare,
    },
    {
      name: 'Users List',
      link: '/dashboard/users-list',
      icon: faUsers,
    },
    {
      name: 'Order List',
      link: '/dashboard/orders-list',
      icon: faBoxes,
    },
  ];
  constructor() {}

  ngOnInit() {}
  toggleCollapseShow(classes: any) {
    this.collapseShow = classes;
  }
}
