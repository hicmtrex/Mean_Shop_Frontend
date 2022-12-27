import { Component, OnInit } from '@angular/core';
import { OrderServiceService } from 'src/app/main/services/context/order-service.service';
import { OrderData } from 'src/app/main/services/interfaces/order.interface';

@Component({
  selector: 'app-order-hestory',
  templateUrl: './order-hestory.component.html',
  styleUrls: ['./order-hestory.component.css'],
})
export class OrderHestoryComponent implements OnInit {
  orders: OrderData[] = [];
  theades: string[] = [
    'Total Price',
    'Address',
    'Created At',
    'Paid',
    'Actions',
  ];
  constructor(private orderService: OrderServiceService) {}

  getUserOrders() {
    this.orderService.getUserOrders().subscribe({
      next: (res: any) => {
        this.orders = res;
      },
    });
  }

  ngOnInit(): void {
    this.getUserOrders();
  }
}
