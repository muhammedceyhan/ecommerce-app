import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminOrder } from '../models/admin-order.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {

  //private apiUrl = `${environment.apiUrl}/orders`;
  private apiUrl = 'http://localhost:8080/api/orders';


  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<AdminOrder[]> {
    return this.http.get<AdminOrder[]>(this.apiUrl);
  }

  updateOrderStatus(orderId: number, newStatus: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/${orderId}/status?status=${newStatus}`, {});
}

}
