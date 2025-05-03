import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  standalone: false,
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService, private authService: AuthService) {}

  ngOnInit(): void {
    const sellerId = this.authService.getUserId();
    if (sellerId) {
      this.orderService.getSellerOrders(sellerId).subscribe({
        next: (data) => {
          this.orders = data;
        },
        error: (err) => {
          console.error('Failed to load orders', err);
        }
      });
    }
  }
}
