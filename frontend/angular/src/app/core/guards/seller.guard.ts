// src/app/core/guards/seller.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class SellerGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = this.auth.getRole();
    if (role === 'ROLE_SELLER') {
      return true;
    }
    // değilse login’e yönlendir
    this.router.navigate(['/auth/login']);
    return false;
  }
}
