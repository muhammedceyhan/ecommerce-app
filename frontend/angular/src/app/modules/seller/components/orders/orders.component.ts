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

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  // ngOnInit(): void {
  //   const sellerId = this.authService.getUserId();
  //   if (sellerId) {
  //     this.orderService.getSellerOrders(sellerId).subscribe({
  //       next: (data) => {
  //         this.orders = data;
  //       },
  //       error: (err) => {
  //         console.error('Failed to load orders', err);
  //       },
  //     });
  //   }
  // }

  ngOnInit(): void {
  const sellerId = this.authService.getUserId();
  if (sellerId) {
    this.orderService.getSellerOrders(sellerId).subscribe({
      next: (data) => {
        // Şu anki durumu ayrıca newStatus olarak ata
        this.orders = data.map(order => ({
          ...order,
          newStatus: order.status  // dropdown buna bağlı olacak
        }));
      },
      error: (err) => {
        console.error('Failed to load orders', err);
      }
    });
  }
}


  // updateOrderStatus(orderId: number, newStatus: string): void {
  //   console.log('Updating order:', orderId, 'to:', newStatus); // 👈 LOG
  //   this.orderService.updateOrderStatus(orderId, newStatus).subscribe({
  //     next: () => {
  //       alert('Durum güncellendi');
  //     },
  //     error: (err: any) => {
  //       alert('Durum güncellenemedi');
  //       console.error(err);
  //     },
  //   });
  // }

  updateOrderStatus(orderId: number, newStatus: string): void {
  this.orderService.updateOrderStatus(orderId, newStatus).subscribe({
    next: () => {
      const updatedOrder = this.orders.find(o => o.id === orderId);
      if (updatedOrder) {
        updatedOrder.status = newStatus; // 🔥 CURRENT status'ı güncelle
      }
      alert('Durum güncellendi');
    },
    error: (err: any) => {
      alert('Durum güncellenemedi');
      console.error('HATA:', err);
    }
  });
}


}
