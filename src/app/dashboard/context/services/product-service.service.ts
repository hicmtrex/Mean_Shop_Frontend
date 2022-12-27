import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  CreateProduct,
  FilterProduct,
  UpdateProduct,
} from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  apiUrl: string = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getAllProducts(filter?: FilterProduct) {
    return filter
      ? this.http.get(
          `${this.apiUrl}?query=${filter?.search}&category=${filter?.category}&page=${filter?.page}`
        )
      : this.http.get(this.apiUrl);
  }

  createProduct = (product: CreateProduct) => {
    return this.http.post(this.apiUrl, product);
  };

  updateProduct = (product: UpdateProduct) => {
    return this.http.put(`${this.apiUrl}/${product._id}`, product);
  };

  deleteProduct = (id: string) => {
    return this.http.delete(`${this.apiUrl}/${id}`);
  };
}
