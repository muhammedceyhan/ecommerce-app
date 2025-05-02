import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../modules/auth/services/auth.service';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  isAdminUser = false;
  cartItemCount = 0;
  searchQuery: string = '';
  currentUserName: string | null = null;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAuthStatus();
    this.cartService.getCartedProducts(1).subscribe({
      next: (cartItems) => {
        this.cartItemCount = cartItems.length;
      },
      error: (err) => {
        console.error('Sepet bilgisi alınamadı', err);
      }
    });
  }

  checkAuthStatus() {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.isAdminUser = this.authService.getRole() === 'ROLE_ADMIN';
    const currentUser = this.authService.getCurrentUser(); // yeni ekledik
    this.currentUserName = currentUser ? currentUser.username : null;
  }

  logout(): void {
    this.authService.logout();
    this.checkAuthStatus();
    this.router.navigate(['/login']);
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/products'], { queryParams: { search: this.searchQuery.trim() } });
    }
  }
}
