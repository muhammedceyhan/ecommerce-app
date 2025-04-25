import { HttpClient } from '@angular/common/http';
import { Product } from './../../product/models/product.model';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:8080/api/products';

  private cart = new BehaviorSubject<Product[]>([]);
  cart$ = this.cart.asObservable();

  constructor(private http: HttpClient) {
    this.loadCart(); // otomatik yüklenmesi için constructor'da çağrılır
  }

  loadCart() {
    this.getCartedProducts().subscribe(data => {
      this.cart.next(data); // HATA BUYDU
    });
  }

  getCartedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/cart/items');
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  // İstersen bu methodu tutabilirsin ama:
  getCart(): Product[] {
    return this.cart.getValue(); // doğru hali
  }
}
