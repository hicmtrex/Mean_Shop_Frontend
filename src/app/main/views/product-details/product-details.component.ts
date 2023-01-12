import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetProducts } from 'src/app/dashboard/context/interfaces/product.interface';
import { CartServiceService } from '../../services/context/cart-service.service';
import { MainproductServiceService } from '../../services/context/mainproduct-service.service';
import { Observable, takeUntil, tap } from 'rxjs';
import { Unsub } from 'src/app/shared/unsub';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent
  extends Unsub
  implements OnInit, OnDestroy
{
  id: any = this.route.snapshot.paramMap.get('id');
  product$!: Observable<GetProducts>;
  ratings: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: MainproductServiceService,
    private cartService: CartServiceService,
    private router: Router
  ) {
    super();
  }

  addToCart(p: GetProducts) {
    this.cartService.addToCart(p);
    this.router.navigate(['/cart']);
  }

  ngOnInit(): void {
    this.product$ = this.productService.getProductById(this.id).pipe(
      takeUntil(this.unsubscribe$),
      tap((res: any) => {
        this.ratings = [...Array(res.rating).keys()];
      })
    );
  }
}
