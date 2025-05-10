import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { Product } from '../../../product/models/product.model';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { Category } from '../../../product/models/category.model';
import { CategoryService } from '../../../product/services/category.service';

@Component({
  selector: 'app-store-management',
  templateUrl: './store-management.component.html',
  styleUrls: ['./store-management.component.scss'],
  standalone: false
})
export class StoreManagementComponent implements OnInit {
  myProducts: Product[] = [];
  userId: number | null = null;


  constructor(
    private sellerService: SellerService,
    private authService: AuthService,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    if (this.userId) {
      this.loadMyProducts(this.userId);
    } else {
      console.error('Seller ID bulunamadı. Yeniden giriş yapmayı deneyin.');
    }
  }

  loadMyProducts(sellerId: number): void {
    this.sellerService.getMyProducts(sellerId).subscribe({
      next: (products) => {
        this.myProducts = products;
      },
      error: (err) => {
        console.error('Ürünler yüklenemedi:', err);
      }
    });
  }

  navigateToAdd(): void {
    this.router.navigate(['/seller/add-product']);
  }

  editProduct(productId: number): void {
    this.router.navigate(['/seller/edit-product', productId]);
  }

  goHome(): void {
    this.router.navigate(['/products']).then(() => {
      // sayfa yüklendikten sonra window.location.reload yaparsan frontend full resetlenir
      window.location.reload();
    });
  }
}
