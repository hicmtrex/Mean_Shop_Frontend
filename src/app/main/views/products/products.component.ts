import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetProducts } from 'src/app/dashboard/context/interfaces/product.interface';
import { MainproductServiceService } from '../../services/context/mainproduct-service.service';
import { map, Observable, takeUntil } from 'rxjs';
import { Unsub } from 'src/app/shared/unsub';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent extends Unsub implements OnInit, OnDestroy {
  categories: string[] = [];
  page: number = 1;
  pages: number = 1;
  search: string = '';
  category: string = '';
  timeOutId: any;
  array: number[] = [];
  products$!: Observable<GetProducts[]>;

  constructor(private productService: MainproductServiceService) {
    super();
  }

  getFiltredProducts() {
    this.products$ = this.productService
      .getFiltredProducts({
        search: this.search,
        page: this.page,
        category: this.category,
      })
      .pipe(
        takeUntil(this.unsubscribe$),
        map((res: any) => {
          this.categories = res.categories;
          this.setPages(res.pages);
          return res.products;
        })
      );
  }

  setSearch(event: KeyboardEvent) {
    this.search = (event.target as HTMLInputElement).value;
    clearTimeout(this.timeOutId);

    this.timeOutId = setTimeout(() => {
      this.getFiltredProducts();
    }, 500);
  }

  setCategory(v: string) {
    this.category = v;
    this.getFiltredProducts();
  }
  setPage(p: number) {
    this.page = p;
    this.getFiltredProducts();
  }

  setPages(p: number) {
    this.array = [...Array(p).keys()];
    return (this.pages = p);
  }

  ngOnInit(): void {
    this.getFiltredProducts();
  }
}
