import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl: string = `${environment.apiUrl}/users`;
  constructor(private http: HttpClient) {}

  getUserById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateUser(user: any) {
    return this.http.put(`${this.apiUrl}/${user.id}`, user);
  }
}
