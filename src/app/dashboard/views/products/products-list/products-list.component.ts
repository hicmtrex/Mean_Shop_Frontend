import { Component, OnInit } from '@angular/core';
import { GetProducts } from 'src/app/dashboard/context/interfaces/product.interface';
import { ProductServiceService } from 'src/app/dashboard/context/services/product-service.service';
import { DialogService } from '@ngneat/dialog';
import { ProductModalComponent } from 'src/app/dashboard/containers/modals/product-modal/product-modal.component';
import { UpdateproductModalComponent } from 'src/app/dashboard/containers/modals/updateproduct-modal/updateproduct-modal.component';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, takeUntil } from 'rxjs';
import { Unsub } from 'src/app/shared/unsub';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent extends Unsub implements OnInit {
  theades: string[] = ['Product', 'Brand', 'Created At', 'Status', 'Actions'];
  categories: string[] = [];
  page: number = 1;
  pages: any = 1;
  search: string = '';
  timeOutId: any;
  array: number[] = [];
  products$!: Observable<GetProducts[]>;

  constructor(
    private productService: ProductServiceService,
    public toast: ToastrService,
    private dialog: DialogService
  ) {
    super();
  }

  getProducts(): void {
    this.products$ = this.productService
      .getAllProducts({ search: this.search, page: this.page, category: '' })
      .pipe(
        takeUntil(this.unsubscribe$),
        map((res: any) => {
          this.categories = res.categories;
          this.setPages(res.pages);
          return res.products;
        })
      );
  }

  deleteProduct = (args: any): void => {
    if (window.confirm('Are you sure?')) {
      this.productService.deleteProduct(args).subscribe({
        next: (res: any) => {
          this.toast.success(res);
          this.getProducts();
          this.setPage(1);
        },
      });
    }
  };

  ngOnInit(): void {
    this.getProducts();
  }

  open() {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      width: 900,
    });
    dialogRef.afterClosed$.subscribe((res) => {
      if (res) {
        this.getProducts();
      }
    });
  }

  openUpdate(p: GetProducts) {
    const dialogRef = this.dialog.open(UpdateproductModalComponent, {
      width: 900,
      data: p,
    });
    dialogRef.afterClosed$.subscribe((res) => {
      if (res) {
        this.getProducts();
      }
    });
  }

  setPage(p: number): void {
    this.page = p;
    this.getProducts();
  }

  setPages(p: number): number {
    this.array = [...Array(p).keys()];
    return (this.pages = p);
  }

  setSearch(event: Event): void {
    this.search = (<HTMLInputElement>event.target).value;
    clearTimeout(this.timeOutId);
    this.timeOutId = setTimeout(() => {
      this.getProducts();
    }, 1000);
  }
}
