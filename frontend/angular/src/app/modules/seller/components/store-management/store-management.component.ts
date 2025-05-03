import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { Product } from '../../../product/models/product.model';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-store-management',
  templateUrl: './store-management.component.html',
  styleUrls: ['./store-management.component.scss'],
  standalone:false
})
export class StoreManagementComponent implements OnInit {
  myProducts: Product[] = [];

  constructor(
    private sellerService: SellerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadMyProducts();
  }

  loadMyProducts(): void {
    const sellerId = this.authService.getUserId();
    if (sellerId) {
      this.sellerService.getMyProducts(sellerId).subscribe({
        next: (products) => {
          this.myProducts = products;
        },
        error: (err) => {
          console.error('Error loading products:', err);
        }
      });
    }
  }
}
