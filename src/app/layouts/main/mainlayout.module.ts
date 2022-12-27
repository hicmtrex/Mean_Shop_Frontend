import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainlayoutRoutingModule } from './mainlayout-routing.module';
import { MainlayoutComponent } from './mainlayout/mainlayout.component';
import { NavbarComponent } from 'src/app/main/components/navbar/navbar.component';
import { FooterComponent } from 'src/app/main/components/footer/footer.component';
import { CarouselComponent } from 'src/app/main/components/carousel/carousel.component';
import { HomeComponent } from 'src/app/main/views/home/home.component';
import { ProductCardComponent } from 'src/app/main/components/product-card/product-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from 'src/app/main/views/product-details/product-details.component';
import { CartComponent } from 'src/app/main/views/shop/cart/cart.component';
import { ShippingAddressComponent } from 'src/app/main/views/shop/shipping-address/shipping-address.component';
import { CheckoutComponent } from 'src/app/main/views/shop/checkout/checkout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrderDetailsComponent } from 'src/app/main/views/shop/order-details/order-details.component';
import { ProfileComponent } from 'src/app/main/views/authentication/profile/profile.component';
import { OrderHestoryComponent } from 'src/app/main/views/authentication/order-hestory/order-hestory.component';
import { EditprofileModalComponent } from 'src/app/main/views/authentication/editprofile-modal/editprofile-modal.component';
import { ProductsComponent } from 'src/app/main/views/products/products.component';

@NgModule({
  declarations: [
    MainlayoutComponent,
    NavbarComponent,
    FooterComponent,
    CarouselComponent,
    HomeComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    CartComponent,
    ShippingAddressComponent,
    OrderDetailsComponent,
    CheckoutComponent,
    ProfileComponent,
    OrderHestoryComponent,
    EditprofileModalComponent,
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    MainlayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
})
export class MainlayoutModule {}
