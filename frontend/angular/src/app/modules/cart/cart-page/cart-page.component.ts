import { CartService } from './../services/cart.service';
import { Component } from '@angular/core';
import { Product } from '../../product/models/product.model';

@Component({
  selector: 'app-cart-page',
  standalone: false,
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent {
  cart: Product[] = [];

  constructor(private cartService: CartService) {
    this.cart = this.cartService.getCart();
  }

  getItemPrice(product: Product): number {
    return product.price * product.inCartNumber
  }

}
