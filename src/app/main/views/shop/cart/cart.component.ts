import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetProducts } from 'src/app/dashboard/context/interfaces/product.interface';
import { CartServiceService } from 'src/app/main/services/context/cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  constructor(public cartService: CartServiceService, private router: Router) {}
  cartItems: GetProducts[] = this.cartService.cartItems;

  addToCart(p: GetProducts) {
    this.cartService.addToCart(p);
  }
  removeFromCart(p: GetProducts) {
    this.cartService.removeFromCart(p);
  }

  deleteFromCart(id: string) {
    this.cartService.deleteFromCart(id);
  }

  goToAddress() {
    this.router.navigate(['/shipping-address']);
  }
}
