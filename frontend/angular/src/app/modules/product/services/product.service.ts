import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);

  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }



  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }
  getProductsByLoggedUser(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/seller/me`);
  }
  getFavoriteCount(productId: number): Observable<number> {
  return this.http.get<number>(`http://localhost:8080/api/favorites/product/${productId}/count`);
}


}
