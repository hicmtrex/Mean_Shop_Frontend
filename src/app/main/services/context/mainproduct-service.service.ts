import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilterProduct } from 'src/app/dashboard/context/interfaces/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MainproductServiceService {
  apiUrl: string = `${environment.apiUrl}/products`;
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(this.apiUrl);
  }

  getFiltredProducts(filter?: FilterProduct) {
    return filter
      ? this.http.get(
          `${this.apiUrl}?query=${filter?.search}&category=${filter?.category}&page=${filter?.page}`
        )
      : this.http.get(this.apiUrl);
  }

  getProductById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
