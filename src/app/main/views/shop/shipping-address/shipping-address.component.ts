import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartServiceService } from 'src/app/main/services/context/cart-service.service';
import { ShippingAddress } from 'src/app/main/services/interfaces/cart.address.interface';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css'],
})
export class ShippingAddressComponent implements OnInit {
  formData!: FormGroup;
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private cartService: CartServiceService
  ) {}
  shippingAddress: ShippingAddress = this.cartService.shippingAddress;

  createForm() {
    this.formData = this.builder.group({
      address: [this.shippingAddress?.address || '', [Validators.required]],
      city: [this.shippingAddress?.city || '', [Validators.required]],
      postalCode: [
        this.shippingAddress?.postalCode || '',
        [Validators.required],
      ],
      country: [this.shippingAddress?.country || '', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  submit() {
    this.cartService.saveShippingAddress(this.formData.value);
    this.router.navigate(['/checkout']);
  }
}
