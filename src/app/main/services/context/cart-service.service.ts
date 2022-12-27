import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { GetProducts } from 'src/app/dashboard/context/interfaces/product.interface';
import { ShippingAddress } from '../interfaces/cart.address.interface';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  constructor(private http: HttpClient, private storage: LocalStorageService) {}
  cartItems: GetProducts[] = this.storage.retrieve('mean-cart') || [];
  shippingAddress: ShippingAddress =
    this.storage.retrieve('mean-address') || null;

  addToCart(product: GetProducts) {
    const exist = this.cartItems.find((item) => item._id === product._id);

    if (exist) {
      exist.qty += 1;
    } else {
      this.cartItems = [...this.cartItems, product];
    }
    this.saveValue('mean-cart', this.cartItems);
  }

  itemsPrice: number = this.cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  removeFromCart(product: GetProducts) {
    const exist = this.cartItems.find((item) => item._id === product._id);
    if (exist) {
      if (exist.qty == 1) {
        const index = this.cartItems.findIndex(
          (item) => item._id === product._id
        );
        this.cartItems.splice(index, 1);
      } else {
        exist.qty -= 1;
      }
    }
    this.saveValue('mean-cart', this.cartItems);
  }

  deleteFromCart(id: string) {
    const index = this.cartItems.findIndex((item) => item._id === id);
    this.cartItems.splice(index, 1);
    this.saveValue('mean-cart', this.cartItems);
  }

  //Address
  saveShippingAddress(address: ShippingAddress) {
    this.shippingAddress = address;
    this.saveValue('mean-address', this.shippingAddress);
  }
  resetCart() {
    this.cartItems = [];
    this.saveValue('mean-cart', this.cartItems);
  }

  //localstorage
  saveValue(key: string, value: any) {
    this.storage.store(key, value);
  }
  getValue(key: string) {
    return this.storage.retrieve(key);
  }
}
