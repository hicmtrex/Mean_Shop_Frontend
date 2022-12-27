import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetProducts } from 'src/app/dashboard/context/interfaces/product.interface';
import { AuthServiceService } from 'src/app/main/services/context/auth-service.service';
import { CartServiceService } from 'src/app/main/services/context/cart-service.service';
import { OrderServiceService } from 'src/app/main/services/context/order-service.service';
import { ShippingAddress } from 'src/app/main/services/interfaces/cart.address.interface';
import { UserData } from 'src/app/main/services/interfaces/user.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  constructor(
    private cartService: CartServiceService,
    private authService: AuthServiceService,
    private orderService: OrderServiceService,
    private router: Router,
    private toast: ToastrService
  ) {}
  cartItems: GetProducts[] = this.cartService.cartItems;
  user?: UserData = this.authService.user;
  shippingAddress?: ShippingAddress = this.cartService.shippingAddress;
  itemsPrice: number = this.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  createOrder() {
    const model = {
      cartItems: this.cartItems,
      shippingAddress: this.shippingAddress,
      totalPrice: this.itemsPrice + 8,
    };
    this.orderService.createOrder(model).subscribe({
      next: (res: any) => {
        this.router.navigate([`/orders/${res._id}`]);
        this.toast.success('Order has been created');
        this.cartService.resetCart();
      },
    });
  }
}
