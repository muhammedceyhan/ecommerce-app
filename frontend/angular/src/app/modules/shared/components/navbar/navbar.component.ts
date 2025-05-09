import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
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
  isAuthPage = false;
  cartItemCount = 0;
  searchQuery: string = '';
  currentUserName: string | null = null;
  isSellerUser = false;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkAuthStatus();
        this.checkIfAuthPage();
      }
    });

    const currentUser = this.authService.getCurrentUser();
    const userId = currentUser ? currentUser.id : null;

    if (userId) {
      this.cartService.getCartedProducts(userId).subscribe({
        next: (cartItems) => {
          this.cartItemCount = cartItems.length;
        },
        error: (err) => {
          console.error('Sepet bilgisi alınamadı', err);
        }
      });
    }
  }

  checkAuthStatus() {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.isAdminUser = this.authService.getUserRole() === 'ROLE_ADMIN';
    const currentUser = this.authService.getCurrentUser();
    this.currentUserName = currentUser ? currentUser.username : null;
  }

  checkIfAuthPage() {
    const currentUrl = this.router.url;
    this.isAuthPage = currentUrl.includes('/login') || currentUrl.includes('/register');
  }

  getUserInitials(): string {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.username) {
      return currentUser.username.substring(0, 2).toUpperCase();
    } else if (currentUser && currentUser.email) {
      return currentUser.email.substring(0, 2).toUpperCase();
    }
    return 'US';  // fallback default
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

  get isUser(): boolean {
  const role = this.authService.getUserRole();
  return role === 'ROLE_USER';
}

get isSeller(): boolean {
  const role = this.authService.getUserRole();
  return role === 'ROLE_SELLER';
}

get isAdmin(): boolean {
  const role = this.authService.getUserRole();
  return role === 'ROLE_ADMIN';
}

get showCart(): boolean {
  return this.isUser || this.isAdmin;
}

get showAccount(): boolean {
  return this.isUser || this.isSeller || this.isAdmin;
}

get ordersRoute(): string {
  const role = this.authService.getUserRole();
  if (role === 'ROLE_SELLER') return '/seller/orders';
  if (role === 'ROLE_USER') return '/user-orders';
  if (role === 'ROLE_ADMIN') return '/admin/orders'; // opsiyonel
  return '/';
}

}
