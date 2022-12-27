import { Component, OnInit } from '@angular/core';
import { GetProducts } from 'src/app/dashboard/context/interfaces/product.interface';
import { MainproductServiceService } from '../../services/context/mainproduct-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: GetProducts[] = [];
  categories: string[] = [];
  page: number = 1;
  pages: number = 1;
  search: string = '';
  category: string = '';
  timeOutId: any;
  array: number[] = [];
  constructor(private productService: MainproductServiceService) {}

  getFiltredProducts() {
    this.productService
      .getFiltredProducts({
        search: this.search,
        page: this.page,
        category: this.category,
      })
      .subscribe({
        next: (res: any) => {
          this.products = res.products;
          this.categories = res.categories;
          this.setPages(res.pages);
        },
      });
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
