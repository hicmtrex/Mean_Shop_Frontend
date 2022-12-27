import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/main/services/context/auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthServiceService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const newRequest = request.clone({
      headers: request.headers.append(
        'Authorization',
        `Bearer ${this.authService.token}`
      ),
      withCredentials: true,
    });
    if (this.authService.isAuth) {
      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
