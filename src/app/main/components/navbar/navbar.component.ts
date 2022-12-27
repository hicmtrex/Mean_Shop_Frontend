import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/context/auth-service.service';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CartServiceService } from '../../services/context/cart-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  cartIcon = faCartShopping;
  showDropdown: boolean = false;
  navLinks: any = [
    { name: 'Home', link: '/' },
    { name: 'Products', link: '/products' },
    { name: 'Contact', link: '#' },
  ];
  constructor(
    public authSerice: AuthServiceService,
    public cartService: CartServiceService
  ) {}

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  userLogout() {
    this.authSerice.userLogout();

    this.cartService.resetCart();
  }
}
