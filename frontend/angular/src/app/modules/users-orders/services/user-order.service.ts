import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserOrder } from '../models/user-order.model';

@Injectable({
  providedIn: 'root'
})
export class UserOrderService {
  private apiUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) {}

  getOrdersByUserId(userId: number): Observable<UserOrder[]> {
    return this.http.get<UserOrder[]>(`${this.apiUrl}/user/${userId}`);
  }
}
