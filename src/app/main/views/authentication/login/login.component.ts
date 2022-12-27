import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/main/services/context/auth-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formData!: FormGroup;
  user: any;
  jwt = new JwtHelperService();
  constructor(
    private builder: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  createForm() {
    this.formData = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  //form
  get email() {
    return this.formData.get('email');
  }
  get password() {
    return this.formData.get('password');
  }

  submit() {
    this.authService.userLogin(this.formData.value);
  }

  ngOnInit(): void {
    if (this.authService.isAuth) {
      this.router.navigate(['/']);
    }
    this.createForm();
  }
}
