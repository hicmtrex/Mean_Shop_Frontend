import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminOrderService } from 'src/app/dashboard/context/services/order-service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit {
  page: number = 1;
  pages: number = 1;
  array: number[] = [];
  search: string = '';
  orders: any;
  theades: string[] = [
    'User',
    'Total Price',
    'Address',
    'Created At',
    'Paid',
    'Actions',
  ];
  constructor(
    private orderService: AdminOrderService,
    public toast: ToastrService
  ) {}

  getOrders() {
    this.orderService.getAllOrders(this.page).subscribe({
      next: (res: any) => {
        this.orders = res.orders;
        this.setPages(res.pages);
      },
    });
  }

  deleteOrder(id: string) {
    this.orderService.deleteOrder(id).subscribe({
      complete: () => {
        this.toast.success('order has been deleted');
        this.getOrders();
      },
    });
  }

  setPage(p: number) {
    this.page = p;
    this.getOrders();
  }

  setPages(p: number) {
    this.array = [...Array(p).keys()];
    return (this.pages = p);
  }

  ngOnInit(): void {
    this.getOrders();
  }
}
