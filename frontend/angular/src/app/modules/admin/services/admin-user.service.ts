import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminUser } from '../models/admin-user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
  private apiUrl = 'http://localhost:8081/api/admin/users';

  constructor(private http: HttpClient) {}

  // Tüm kullanıcıları getir
  getAllUsers(): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>(this.apiUrl);
  }

  // Kullanıcı sil
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
