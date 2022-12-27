import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  UserData,
  UserLogin,
  UserRegister,
} from '../interfaces/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from 'ngx-webstorage';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService implements OnInit {
  authUrl: string = `${environment.apiUrl}/auth`;
  token!: string | null;
  user?: UserData;
  jwt = new JwtHelperService();
  redirectUrl = '';
  constructor(
    private http: HttpClient,
    private storage: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((res) => {
      this.redirectUrl = res['redirectUrl'] || '/';
    });
  }

  isAuth: boolean = this.storage.retrieve('token-mean') || false;

  //Authentication
  userLogin(data: UserLogin) {
    return this.http
      .post(`${this.authUrl}/login`, data, { withCredentials: true })
      .subscribe({
        next: (data: any) => {
          this.token = data.token;
          this.user = this.jwt.decodeToken(data.token).UserInfo;
          this.isAuth = true;
          this.saveValue('token-mean', this.token);
        },
        complete: () => {
          this.router.navigate([this.redirectUrl]);
        },
      });
  }

  userRegister(data: UserRegister) {
    return this.http
      .post(`${this.authUrl}`, data, { withCredentials: true })
      .subscribe({
        next: (data: any) => {
          this.token = data.token;
          this.user = this.jwt.decodeToken(data.token).UserInfo;
          this.isAuth = true;
          this.saveValue('token-mean', this.token);
        },
        complete: () => {
          this.router.navigate([this.redirectUrl]);
        },
      });
  }

  userLogout() {
    this.token = null;
    this.user = undefined;
    this.isAuth = false;
    this.storage.clear('token-mean');
    this.storage.clear('mean-cart');
    this.storage.clear('mean-address');
    document.location.href = '/';
  }

  checkIsAuth(): boolean {
    if (!this.token) return false;
    if (this.jwt.isTokenExpired(this.token)) return false;
    if (this.isAuth) return true;

    return true;
  }

  checkIsAdmin(): boolean {
    if (this.user?.isAdmin === false) return false;
    return this.checkIsAuth();
  }

  //localstorage
  saveValue(key: string, value: any) {
    this.storage.store(key, value);
  }

  //localstorage
  getValue(key: string) {
    return this.storage.retrieve(key);
  }

  ngOnInit(): void {}
}
