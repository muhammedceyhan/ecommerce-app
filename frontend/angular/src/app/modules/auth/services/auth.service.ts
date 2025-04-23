import { Injectable, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

interface AuthUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registeredUsers: AuthUser[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)){
      const savedUsers = localStorage.getItem('registeredUsers');
    if (savedUsers) {
      this.registeredUsers = JSON.parse(savedUsers);
    } else {
      // Örnek admin hesabı ekleyelim
      this.registeredUsers.push({
        id: 1,
        name: 'Admin Demo',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'ADMIN'
      });

      this.registeredUsers.push({
        id: 2,
        name: 'Mehmet Yılmaz',
        email: 'mehmet@example.com',
        password: '12345678',
        role: 'USER'
      });
      localStorage.setItem('registeredUsers', JSON.stringify(this.registeredUsers));

      this.syncToStorage();
    }
  }
  }

  private syncToStorage() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('registeredUsers', JSON.stringify(this.registeredUsers));
    }
  }

  register(userData: AuthUser): Observable<any> {
    const exists = this.registeredUsers.some(u => u.email === userData.email);
    if (exists) {
      return throwError(() => new Error('Email already exists'));
    }

    userData.id = this.registeredUsers.length + 1;
    this.registeredUsers.push(userData);
    this.syncToStorage();
    return of({ message: 'Kayıt başarılı' });
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    const user = this.registeredUsers.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('token', 'mock-token');
        localStorage.setItem('role', user.role);
      }
      return of({ message: 'Giriş başarılı', role: user.role });
    }

    return throwError(() => new Error('Invalid credentials'));
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
}
