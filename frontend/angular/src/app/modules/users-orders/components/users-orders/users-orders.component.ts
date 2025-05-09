import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { UserOrder } from '../../models/user-order.model';
import { UserOrderService } from '../../services/user-order.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './users-orders.component.html',
  styleUrls: ['./users-orders.component.scss'],
  standalone: false,
})
export class UsersOrdersComponent implements OnInit {
  orders: UserOrder[] = [];

  constructor(
    private orderService: UserOrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.orderService.getOrdersByUserId(userId).subscribe({
        next: (data: UserOrder[]) => (this.orders = data),
        error: (err: any) => console.error('Siparişler alınamadı:', err),
      });
    }
  }
}
