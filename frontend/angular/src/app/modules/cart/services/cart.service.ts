import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart.model'; // Doğru DTO modeli kullanılıyor

@Injectable({
  providedIn: 'root'
})
export class CartService {
[x: string]: any;


  private apiUrl = `${environment.apiUrl}/cart`;

  constructor(private http: HttpClient) {}

  // Kullanıcının sepetindeki ürünleri getir
  getCartedProducts(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/${userId}`);
  }

  // Sepete ürün ekle (İstersen bunu da kullanabilirsin)
  addProductToCart(userId: number, productId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/add?userId=${userId}&productId=${productId}`, {});
  }
    // cart.service.ts içine ekle
  getProductQuantityInCart(userId: number, productId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${userId}/quantity/${productId}`);
  }
    // Ürün adedini güncelle
  updateCartItemQuantity(cartItemId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${cartItemId}/update-quantity?quantity=${quantity}`, {});
  }

  // Sepetten ürünü tamamen kaldır
  removeCartItem(cartItemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${cartItemId}/remove`);
  }

}
