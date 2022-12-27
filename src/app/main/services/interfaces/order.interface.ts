import { GetProducts } from 'src/app/dashboard/context/interfaces/product.interface';
import { ShippingAddress } from './cart.address.interface';
import { UserData } from './user.interface';

export interface OrderData {
  _id: string;
  user: { _id: string; username: string; email: string; image: string };
  cartItems: any[];
  shippingAddress: ShippingAddress;
  totalPrice: number;
  isPaid: boolean;
  createdAt: Date;
}
