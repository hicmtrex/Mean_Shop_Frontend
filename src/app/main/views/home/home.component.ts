import { Component, OnInit } from '@angular/core';
import { GetProducts } from 'src/app/dashboard/context/interfaces/product.interface';
import { metaProducts } from 'src/assets/data/products';
import { MainproductServiceService } from '../../services/context/mainproduct-service.service';
import { ProductsType } from '../../services/interfaces/product.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: GetProducts[] = [];

  constructor(private productSerive: MainproductServiceService) {}

  getProducts() {
    this.productSerive.getAllProducts().subscribe({
      next: (res: any) => {
        this.products = res.products;
      },
    });
  }
  ngOnInit(): void {
    this.getProducts();
  }
}
