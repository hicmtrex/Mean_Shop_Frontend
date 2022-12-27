import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminOrderService {
  apiUrl: string = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getAllOrders(page: number) {
    return this.http.get(`${this.apiUrl}?page=${page}`);
  }

  deleteOrder(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getOrderById(id: string | null) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
