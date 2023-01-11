import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetProducts } from 'src/app/dashboard/context/interfaces/product.interface';
import { CartServiceService } from '../../services/context/cart-service.service';
import { MainproductServiceService } from '../../services/context/mainproduct-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  id: any = this.route.snapshot.paramMap.get('id');
  product!: GetProducts;
  ratings: number[] = [];
  dataSub!: Subscription;
  constructor(
    private route: ActivatedRoute,
    private productService: MainproductServiceService,
    private cartService: CartServiceService,
    private router: Router
  ) {}

  getProductById() {
    this.dataSub = this.productService.getProductById(this.id).subscribe({
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
    this.getProductById();
  }
  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }
}
