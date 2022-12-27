import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthServiceService } from 'src/app/main/services/context/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formData!: FormGroup;
  user: any;
  userIcon = faUser;
  constructor(
    private builder: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  createForm() {
    this.formData = this.builder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    this.authService.userRegister(this.formData.value);
  }

  ngOnInit(): void {
    this.createForm();
    if (this.authService.isAuth) {
      this.router.navigate(['/']);
    }
  }
}
