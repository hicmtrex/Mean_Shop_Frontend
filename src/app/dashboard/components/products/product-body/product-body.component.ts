import { Component, Input } from '@angular/core';
import { GetProducts } from 'src/app/dashboard/context/interfaces/product.interface';

@Component({
  selector: 'app-product-body',
  templateUrl: './product-body.component.html',
})
export class ProductBodyComponent {
  @Input() products!: GetProducts[];
}
