import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetProducts } from 'src/app/dashboard/context/interfaces/product.interface';
import { CartServiceService } from '../../services/context/cart-service.service';
import { MainproductServiceService } from '../../services/context/mainproduct-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  id: any = '';
  product!: GetProducts;
  ratings: number[] = [];
  constructor(
    private route: ActivatedRoute,
    private productService: MainproductServiceService,
    private cartService: CartServiceService,
    private router: Router
  ) {}

  getProductById() {
    this.productService.getProductById(this.id).subscribe({
      next: (res: any) => {
        this.product = res;
        this.ratings = [...Array(res.rating).keys()];
      },
    });
  }

  addToCart() {
    this.cartService.addToCart(this.product);
    this.router.navigate(['/cart']);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProductById();
  }
}
