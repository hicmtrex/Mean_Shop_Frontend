import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './main/services/context/auth-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  jwt = new JwtHelperService();

  constructor(private authSerive: AuthServiceService) {}

  ngOnInit(): void {
    this.authSerive.token = this.authSerive.getValue('token-mean') || null;
    if (this.authSerive.token) {
      this.authSerive.user = this.jwt.decodeToken(
        this.authSerive.token
      ).UserInfo;
      this.authSerive.isAuth = true;
    }
  }
}
