import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, takeUntil } from 'rxjs';
import { OrderServiceService } from 'src/app/main/services/context/order-service.service';
import { OrderData } from 'src/app/main/services/interfaces/order.interface';
import { Unsub } from 'src/app/shared/unsub';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent extends Unsub {
  paymentHandler: any = null;
  order: OrderData | null = null;
  order$!: Observable<any>;
  id: string | null = '';
  key: string =
    'pk_test_51KesRYH5cYomygyIVpcJgPzIuCxSTmCZVDP07aX5Rl6fkq3LxILNREpH5VuNCw9NnNNJey4LEnPsLFaTHJaq9AiP00FJmrxaq7';

  stripeToken: any;
  constructor(
    private orderService: OrderServiceService,
    private route: ActivatedRoute,
    public toast: ToastrService
  ) {
    super();
  }

  getOrderById() {
    this.order$ = this.orderService
      .getOrderById(this.id)
      .pipe(takeUntil(this.unsubscribe$));
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getOrderById();
    this.invokeStripe();
  }
  //stripe
  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.key,
      locale: 'auto',
      token: function (stripeToken: any) {
        paymentStripe(stripeToken, amount);
      },
    });

    const paymentStripe = (token: any, amount: number) => {
      this.orderService
        .orderPayment({
          stripeToken: token,
          totalPrice: amount,
        })
        .subscribe({
          complete: () => {
            this.updateOrder();
          },
        });
    };

    paymentHandler.open({
      name: 'Positronx',
      description: '3 widgets',
      amount: amount * 100,
    });
  }
  updateOrder() {
    this.orderService.updateOrder({ isPaid: true, _id: this.id }).subscribe({
      complete: () => {
        this.toast.show('you have been paid successfully');
        this.getOrderById();
      },
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.key,
          locale: 'auto',
          token: async function (stripeToken: any) {
            console.log(stripeToken);
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}
