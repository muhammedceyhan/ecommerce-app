import { Product } from './../../product/models/product.model';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor() { }
  private cart: Product[] = [];

  addToCart(product: Product): void {
    this.cart.push(product);
  }
  getCart(): Product[] {
    return this.cart;
  }
}
