import { Component, Input } from '@angular/core';
import { GetProducts } from 'src/app/dashboard/context/interfaces/product.interface';
import { ProductsType } from '../../services/interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product!: GetProducts;
}
