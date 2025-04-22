import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; // BACKEND URL

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  // // Giriş
  // login(credentials: { email: string; password: string }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
  //     tap((res: any) => {
  //       if (isPlatformBrowser(this.platformId)) {
  //         localStorage.setItem('token', res.token);
  //         localStorage.setItem('role', res.role);
  //       }
  //     })
  //   );
  // }

  // // ✅ Yeni kullanıcı kaydı
  // register(userData: { fullName: string; email: string; password: string; role: string }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/register`, userData);
  // }

  isAuthenticated(): boolean {
    return isPlatformBrowser(this.platformId) && !!localStorage.getItem('token');
  }

  getRole(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('role') : null;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
  }



  login(credentials: { email: string, password: string }): Observable<any> {
    return of({ token: 'mock-token', role: 'ADMIN' }).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
      })
    );
  }

  register(userData: any): Observable<any> {
    return of({ message: 'Registered successfully' });
  }

}
