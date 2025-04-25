import { Router } from '@angular/router';
import { Product } from './../../product/models/product.model';
import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-page',
  standalone: false,
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit {
  cart: Product[] = [];

  constructor(private cartService: CartService, private router: Router) {

  }

  ngOnInit(): void {
    this.cartService.loadCart();
    this.cartService.cart$.subscribe(items => {
      this.cart = items;
    });
  }


  getItemPrice(product: Product): number {
    return product.price * product.inCartNumber
  }
  decreaseItem(product: Product){
    if(product.inCartNumber == 1){
      this.cart.splice(this.cart.indexOf(product), 1);
    }
    product.inCartNumber--;
    this.updateProductDatabase(product)
  }
  increaseItem(product: Product){
    if(product.inCartNumber < product.stock){
      product.inCartNumber++
    }else{
      alert("Can't be add to cart more than stock.");
    }

    this.updateProductDatabase(product)
  }
  calculateTotalPurchase(): number{
    let total = 0;
    this.cart.forEach(item => {
      total += this.getItemPrice(item);
    });
    return total;
  }
  updateProductDatabase(product: Product) {
    this.cartService.updateProduct(product).subscribe(data => {
      product = data;
    });
  }
  returnToMainPage(){
    this.router.navigate(['/products']);
  }
  goToCheckOut(){
    this.router.navigate(['/cart/checkout']);
  }

}
