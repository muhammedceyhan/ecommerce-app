import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AdminProduct } from '../models/admin-product.model';

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {
  private apiUrl = 'http://localhost:8080/api/admin/products'; // örnek endpoint

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<AdminProduct[]> {
    return this.http.get<AdminProduct[]>(this.apiUrl);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getProductById(id: number): Observable<AdminProduct> {
    return this.http.get<AdminProduct>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: AdminProduct): Observable<AdminProduct> {
    return this.http.post<AdminProduct>(this.apiUrl, product);
  }

  updateProduct(id: number, product: AdminProduct): Observable<AdminProduct> {
    return this.http.put<AdminProduct>(`${this.apiUrl}/${id}`, product);
  }


  // Tüm siparişleri getirir (şimdilik sahte verilerle)
  getAllOrders(): Observable<any[]> {
    // Bu backend olmadığında geçici mock veri döndürür
    return of([
      {
        id: 1,
        userEmail: 'ali@example.com',
        totalPrice: 500,
        status: 'Hazırlanıyor',
        items: [
          {
            id: 101,
            name: 'Klavye',
            price: 250,
            stock: 10,
          },
          {
            id: 102,
            name: 'Mouse',
            price: 250,
            stock: 15,
          },
        ],
      },
      {
        id: 2,
        userEmail: 'ayse@example.com',
        totalPrice: 300,
        status: 'Kargoya Verildi',
        items: [
          {
            id: 103,
            name: 'USB Kablo',
            price: 100,
            stock: 30,
          },
        ],
      },
    ]);
  }

  // Siparişin durumunu günceller
  updateOrderStatus(orderId: number, newStatus: string): Observable<any> {
    // Backend ile bağlantı kurulana kadar sadece başarılı yanıt simülasyonu
    return of({ success: true });
  }
}
