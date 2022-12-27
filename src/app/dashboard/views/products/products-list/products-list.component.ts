import { Component, OnInit } from '@angular/core';
import { GetProducts } from 'src/app/dashboard/context/interfaces/product.interface';
import { ProductServiceService } from 'src/app/dashboard/context/services/product-service.service';
import { DialogService } from '@ngneat/dialog';
import { ProductModalComponent } from 'src/app/dashboard/containers/modals/product-modal/product-modal.component';
import { UpdateproductModalComponent } from 'src/app/dashboard/containers/modals/updateproduct-modal/updateproduct-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products: GetProducts[] = [];
  theades: string[] = ['Product', 'Brand', 'Created At', 'Status', 'Actions'];
  categories: string[] = [];
  page: number = 1;
  pages: any = 1;
  search: string = '';
  timeOutId: any;
  array: number[] = [];

  constructor(
    private productService: ProductServiceService,
    public toast: ToastrService,
    private dialog: DialogService
  ) {}

  getProducts(): void {
    this.productService
      .getAllProducts({ search: this.search, page: this.page, category: '' })
      .subscribe({
        next: (res: any) => {
          this.products = res.products;
          this.categories = res.categories;
          this.setPages(res.pages);
        },
      });
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

  setPage(p: number) {
    this.page = p;
    this.getProducts();
  }

  setPages(p: number) {
    this.array = [...Array(p).keys()];
    return (this.pages = p);
  }

  setSearch(event: any) {
    this.search = event.target.value;
    clearTimeout(this.timeOutId);
    this.timeOutId = setTimeout(() => {
      this.getProducts();
    }, 1000);
  }
}
