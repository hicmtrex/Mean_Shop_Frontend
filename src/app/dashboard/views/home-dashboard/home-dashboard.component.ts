import { Component } from '@angular/core';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css'],
})
export class HomeDashboardComponent {
  date = new Date().getFullYear();
  sidebarLinks = [
    {
      name: 'Dashboard',
      link: '/dashboard',
      icon: '',
    },
  ];
}
