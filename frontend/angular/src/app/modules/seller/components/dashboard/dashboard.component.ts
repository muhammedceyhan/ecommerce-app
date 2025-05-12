import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { AuthService } from '../../../auth/services/auth.service';
import { OrderService } from '../../services/order.service';
import { AuthUser } from '../../../auth/models/user.model';
import { HttpClient } from '@angular/common/http';
import { SellerStats } from '../../models/seller-stats.model';
import { SellerStatsService } from '../../services/seller-stats.service';

@Component({
  selector: 'app-dashboard',

  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false,
})
export class DashboardComponent implements OnInit {
  totalProducts = 0;
  totalOrders = 0;
  totalReviews = 0;
  seller: AuthUser | null = null;
  stats: SellerStats | null = null;

  constructor(
    private sellerService: SellerService,
    private orderService: OrderService,
    private authService: AuthService,
    private http: HttpClient,
    private sellerStatsService: SellerStatsService

  ) {}

ngOnInit(): void {

  const sellerId = this.authService.getUserId(); // token'dan alıyorduk
  if (sellerId) {
    this.authService.getCurrentUserFromBackend(sellerId).subscribe(user => {
      if (user) {
      this.seller = user;
      console.log("Bakiye gelen user objesi:", user);


    }
    });

    this.sellerStatsService.getStats().subscribe((data) => {
      this.stats = data;
    });

    this.sellerService.getDashboardStats(sellerId).subscribe(stats => {
      this.totalProducts = stats.totalProducts;
      this.totalOrders = stats.totalOrders;
      this.totalReviews = stats.totalReviews;
    });

  }

}

}


