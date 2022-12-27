import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/guards/authentication.guard';
import { OrderHestoryComponent } from 'src/app/main/views/authentication/order-hestory/order-hestory.component';
import { ProfileComponent } from 'src/app/main/views/authentication/profile/profile.component';
import { HomeComponent } from 'src/app/main/views/home/home.component';
import { ProductDetailsComponent } from 'src/app/main/views/product-details/product-details.component';
import { ProductsComponent } from 'src/app/main/views/products/products.component';
import { CartComponent } from 'src/app/main/views/shop/cart/cart.component';
import { CheckoutComponent } from 'src/app/main/views/shop/checkout/checkout.component';
import { OrderDetailsComponent } from 'src/app/main/views/shop/order-details/order-details.component';
import { ShippingAddressComponent } from 'src/app/main/views/shop/shipping-address/shipping-address.component';
import { MainlayoutComponent } from './mainlayout/mainlayout.component';

const routes: Routes = [
  {
    path: '',
    component: MainlayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'products/:id',
        component: ProductDetailsComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'shipping-address',
        component: ShippingAddressComponent,
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'orders/:id',
        component: OrderDetailsComponent,
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'profile/:id',
        component: ProfileComponent,
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'order-history',
        component: OrderHestoryComponent,
        canActivate: [AuthenticationGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainlayoutRoutingModule {}
