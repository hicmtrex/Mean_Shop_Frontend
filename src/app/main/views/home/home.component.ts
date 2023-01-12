import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, takeUntil } from 'rxjs';
import { GetProducts } from 'src/app/dashboard/context/interfaces/product.interface';
import { Unsub } from 'src/app/shared/unsub';
import { MainproductServiceService } from '../../services/context/mainproduct-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent extends Unsub implements OnInit, OnDestroy {
  products$!: Observable<GetProducts[]>;

  constructor(private productSerive: MainproductServiceService) {
    super();
  }

  ngOnInit(): void {
    this.products$ = this.productSerive.getAllProducts().pipe(
      takeUntil(this.unsubscribe$),
      map((data: any) => data.products)
    );
  }
}
