import { Component, OnInit } from '@angular/core';
import { AdminOrderService } from '../../services/admin-order.service';
import { AdminOrder } from '../../models/admin-order.model';

@Component({
  selector: 'app-order-management',

  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss'],
  standalone: false
})
export class OrderManagementComponent implements OnInit {

  orders: AdminOrder[] = [];

  constructor(private orderService: AdminOrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }


  fetchOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (error) => {
        console.error('Siparişler alınamadı:', error);
      }
    });
  }

  updateOrderStatus(orderId: number, newStatus: string): void {
  this.orderService.updateOrderStatus(orderId, newStatus).subscribe({
    next: () => {
      alert('Durum güncellendi');
    },
    error: (err) => {
      alert('Durum güncellenemedi');
      console.error(err);
    }
  });
}

}
