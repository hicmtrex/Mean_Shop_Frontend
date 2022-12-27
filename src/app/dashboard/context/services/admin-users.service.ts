import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminUsersService {
  apiUrl: string = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getUsersList(filter?: { search: string; page: number }) {
    return filter
      ? this.http.get(
          `${this.apiUrl}?query=${filter?.search}&page=${filter?.page}`
        )
      : this.http.get(this.apiUrl);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
