import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentMethod } from '../models/payment-method.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8080/api/payment-methods';

  constructor(private http: HttpClient) {}

  getPaymentMethodsByUser(userId: number): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(`${this.apiUrl}/user/${userId}`);
  }

  addPaymentMethod(method: PaymentMethod): Observable<PaymentMethod> {
    return this.http.post<PaymentMethod>(this.apiUrl, method);
  }

  deletePaymentMethod(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
