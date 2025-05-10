import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { AuthService } from '../../../auth/services/auth.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-dashboard',

  templateUrl: './dashboard.component.html',
  standalone: false,
})
export class DashboardComponent implements OnInit {
  totalProducts = 0;
  totalOrders = 0;
  totalReviews = 0;

  constructor(
    private sellerService: SellerService,
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const sellerId = this.authService.getUserId();
    if (sellerId) {
      this.sellerService.getDashboardStats(sellerId).subscribe(stats => {
        this.totalProducts = stats.totalProducts;
        this.totalOrders = stats.totalOrders;
        this.totalReviews = stats.totalReviews;
      });
    }
  }
}
