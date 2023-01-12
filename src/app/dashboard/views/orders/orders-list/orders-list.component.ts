import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, takeUntil } from 'rxjs';
import { AdminOrderService } from 'src/app/dashboard/context/services/order-service';
import { OrderData } from 'src/app/main/services/interfaces/order.interface';
import { Unsub } from 'src/app/shared/unsub';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent extends Unsub implements OnInit {
  page: number = 1;
  pages: number = 1;
  array: number[] = [];
  search: string = '';
  orders$!: Observable<OrderData[]>;
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
  ) {
    super();
  }

  getOrders() {
    this.orders$ = this.orderService.getAllOrders(this.page).pipe(
      takeUntil(this.unsubscribe$),
      map((res: any) => {
        this.setPages(res.pages);
        return res.orders;
      })
    );
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
