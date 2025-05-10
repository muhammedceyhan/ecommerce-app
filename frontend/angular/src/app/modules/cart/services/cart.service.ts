import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { CartItem } from '../models/cart.model'; // Doğru DTO modeli kullanılıyor
import { OrderRequest } from '../models/OrderRequest';
import { OrderResponse } from '../models/OrderResponse';
import { ProductService } from '../../product/services/product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
[x: string]: any;


  private apiUrl = `${environment.apiUrl}/cart`;

  constructor(private http: HttpClient,
    private productService: ProductService,
  ) {}

  // Kullanıcının sepetindeki ürünleri getir
  getCartedProducts(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/${userId}`);
  }

  // Sepete ürün ekle (İstersen bunu da kullanabilirsin)
  addProductToCart(userId: number, productId: number): Observable<any> {
    return this.productService.getProductById(productId).pipe(
      switchMap(product => {
        return this.getProductQuantityInCart(userId, productId).pipe(
          switchMap(quantity => {
            if (product.stock < quantity + 1) {
              alert("Can't be added more than stock");
              return of(null); // import { of } from 'rxjs';
            } else {
              return this.http.post(`${this.apiUrl}/add?userId=${userId}&productId=${productId}`, {});
            }
          })
        );
      })
    );
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

  checkout(userId: number, orderRequest: OrderRequest): Observable<OrderResponse> {
    const url = `${environment.apiUrl}/orders/checkout`;
    const params = new HttpParams().set('userId', userId.toString());
    console.log("post address is: " + url)
    return this.http.post<OrderResponse>(url, orderRequest, { params });
  }


}
