import { Injectable, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthUser } from '../models/user.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;
  private tokenKey = 'auth_token';
  private usernameKey = 'auth_username';
  private roleKey = 'auth_role';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {}

  // ← eskisini tamamen silip bunu koy
  register(userData: AuthUser): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, {
      username: userData.fullName,  // back-end DTO’su username bekliyor
      email:    userData.email,
      password: userData.password,
      role:     userData.role       // “ROLE_USER” | “ROLE_SELLER” | “ROLE_ADMIN”
    });
  }

  // auth.service.ts

login(credentials: { email: string, password: string }): Observable<{ token: string; role: string }> {
  return this.http
    .post<{ token: string; role: string }>(
      `${this.baseUrl}/login`,
      credentials
    )
    .pipe(
      tap((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);     // ← rolü de saklıyoruz
        }
      })
    );
}

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
  }

  isAuthenticated(): boolean {
    return isPlatformBrowser(this.platformId) && !!localStorage.getItem('token');
  }

  getRole(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('role') : null;
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ROLE_ADMIN';
  }


  getToken(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('token');
    }
    return null;
  }

  getUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id || null; // Assuming 'id' exists in the token payload
  }

  getCurrentUser(): { id: number, username: string, email: string, role: string } | null {
    const token = this.getToken();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.id,
      username: payload.sub, // JWT içeriğine göre değişebilir
      email: payload.email, // eğer token’da email varsa
      role: payload.role,
    };
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getUsername(): string {
    return localStorage.getItem(this.usernameKey) || '';
  }


  // Kullanıcı bilgilerini güncelle (adres dahil)
  updateUser(updatedUser: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${updatedUser.id}`, updatedUser);
  }

  // Şifre değiştirme
  changePassword(userId: number, oldPassword: string, newPassword: string): Observable<any> {
    const params = new HttpParams()
      .set('oldPassword', oldPassword)
      .set('newPassword', newPassword);
    return this.http.post(`${this.baseUrl}/${userId}/change-password`, {}, { params });
  }


}

