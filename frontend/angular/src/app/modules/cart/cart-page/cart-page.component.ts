import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../models/cart.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  standalone: false,
})
export class CartPageComponent implements OnInit {

  cart: CartItem[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  // Sepeti backend'den çek
  loadCart(): void {
    this.cartService.getCartedProducts().subscribe(
      (data: CartItem[]) => {
        this.cart = data;
      },
      (error) => {
        console.error('Sepet yüklenirken hata oluştu:', error);
      }
    );
  }

  // Sepetteki ürünün toplam fiyatını hesapla
  getItemPrice(item: CartItem): number {
    return item.productPrice * item.quantity;
  }

  // Sepetteki tüm ürünlerin toplam tutarını hesapla
  calculateTotalPurchase(): number {
    return this.cart.reduce((total, item) => total + this.getItemPrice(item), 0);
  }

  increaseItem(item: CartItem): void {
    item.quantity++;
    this.cartService.updateCartItemQuantity(item.cartItemId, item.quantity).subscribe(
      () => {
        console.log('Item quantity increased.');
      },
      (error) => {
        console.error('Error increasing item quantity:', error);
      }
    );
  }

  decreaseItem(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateCartItemQuantity(item.cartItemId, item.quantity).subscribe(
        () => {
          console.log('Item quantity decreased.');
        },
        (error) => {
          console.error('Error decreasing item quantity:', error);
        }
      );
    } else {
      // Quantity 1 ise, ürünü tamamen sepetten kaldırıyoruz
      this.cartService.removeCartItem(item.cartItemId).subscribe(
        () => {
          this.cart = this.cart.filter(cartItem => cartItem.cartItemId !== item.cartItemId);
          console.log('Item removed from cart.');
        },
        (error) => {
          console.error('Error removing item from cart:', error);
        }
      );
    }
  }


  // Ürünü sepetten tamamen kaldır
  removeItem(item: CartItem): void {
    this.cart = this.cart.filter(cartItem => cartItem.cartItemId !== item.cartItemId);
  }

  // Ana sayfaya dön
  returnToMainPage(): void {
    this.router.navigate(['/products']); // Eğer ana sayfan başka bir şeyse değiştir
  }

  // Checkout sayfasına git
  goToCheckOut(): void {
    this.router.navigate(['/checkout']); // Checkout sayfanın route'u burası
  }
}
