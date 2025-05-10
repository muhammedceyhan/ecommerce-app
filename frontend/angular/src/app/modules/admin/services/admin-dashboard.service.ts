import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  private apiUrl = `${environment.apiUrl}/admin/dashboard`;
  constructor(private http: HttpClient) {}

getStats(): Observable<DashboardStats> {
  return this.http.get<DashboardStats>(this.apiUrl); // Zaten environment ile tanımlı
}


}
