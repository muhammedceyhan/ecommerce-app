import { Router } from '@angular/router';
import { Product } from './../../product/models/product.model';
import { CartService } from './../services/cart.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-page',
  standalone: false,
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent {
  cart: Product[] = [];

  constructor(private cartService: CartService, private router: Router) {
    this.cart = this.cartService.getCart();
  }

  getItemPrice(product: Product): number {
    return product.price * product.inCartNumber
  }
  decreaseItem(product: Product){
    if(product.inCartNumber > 1){
      product.inCartNumber--;
    }else {
      this.cart.splice(this.cart.indexOf(product), 1);
    }
  }
  increaseItem(product: Product){
    if(product.inCartNumber < product.stock){
      product.inCartNumber++
    }else{
      alert("Can't be add to cart more than stock.");
    }
  }
  calculateTotalPurchase(): number{
    let total = 0;
    this.cart.forEach(item => {
      total += this.getItemPrice(item);
    });
    return total;
  }
  returnToMainPage(){
    this.router.navigate(['/products']);
  }
  goToCheckOut(){
    this.router.navigate(['/cart/checkout']);
  }

}
