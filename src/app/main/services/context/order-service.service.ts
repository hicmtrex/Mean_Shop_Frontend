import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderServiceService {
  apiUrl: string = `${environment.apiUrl}/orders`;
  constructor(private http: HttpClient) {}

  createOrder(order: any) {
    return this.http.post(this.apiUrl, order);
  }

  getOrderById(id: string | null) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateOrder(data: { _id: string | null; isPaid: boolean }) {
    return this.http.put(`${this.apiUrl}/${data._id}`, data);
  }
  orderPayment(data: { stripeToken: any; totalPrice: any }) {
    return this.http.post(`${this.apiUrl}/payment`, data);
  }

  getUserOrders() {
    return this.http.get(`${this.apiUrl}/user`);
  }
}
