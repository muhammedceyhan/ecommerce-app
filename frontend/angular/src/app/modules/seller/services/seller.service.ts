import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../product/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private baseUrl = 'http://localhost:8080/api/products'; // ✅ BU URL DOĞRU MU kontrol et

  constructor(private http: HttpClient) {}

  addProduct(product: any): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}`, product); // ✅ sellerId backend'e gider
  }

  getSellerProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/seller/me`);
  }

  getMyProducts(sellerId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/seller/${sellerId}`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  updateProduct(id: number, productData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, productData);
  }

}
