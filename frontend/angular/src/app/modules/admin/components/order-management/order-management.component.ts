import { Component, OnInit } from '@angular/core';
import { AdminProduct } from '../../models/admin-product.model';

@Component({
  selector: 'app-order-management',

  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
  ,standalone: false
})
export class OrderManagementComponent implements OnInit {

  // Sipariş verileri: ürünler + kullanıcı bilgisi + sipariş durumu
  orders: {
    id: number;
    customer: string;
    total: number;
    status: string;
    products: AdminProduct[];
  }[] = [];

  statuses = ['Hazırlanıyor', 'Kargoya Verildi', 'Teslim Edildi'];

  ngOnInit(): void {
    this.fetchOrders(); // Başlangıçta verileri yükle
  }

  // Geçici olarak sahte sipariş verileri
  fetchOrders(): void {
    this.orders = [
      {
        id: 1,
        customer: 'ozkan@mail.com',
        total: 1500,
        status: 'Hazırlanıyor',
        products: [
          { id: 1, name: 'Laptop', price: 1000, stock: 5 },
          { id: 2, name: 'Mouse', price: 500, stock: 10 }
        ]
      },
      {
        id: 2,
        customer: 'muhammed@mail.com',
        total: 800,
        status: 'Kargoya Verildi',
        products: [
          { id: 3, name: 'Telefon', price: 800, stock: 3 }
        ]
      }
    ];
  }

  // Siparişin durumunu günceller
  updateOrderStatus(orderId: number, newStatus: string): void {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
    }
  }

  getEventValue(event: Event): string {
    return (event.target as HTMLSelectElement).value;
  }


  // ngOnInit(): void {
  //   this.getOrders();
  // }

  // getOrders(): void {
  //   this.adminService.getAllOrders().subscribe((data) => {
  //     this.orders = data;
  //   });
  // }

  // updateOrderStatus(orderId: number, newStatus: string): void {
  //   this.adminService.updateOrderStatus(orderId, newStatus).subscribe(() => {
  //     this.getOrders(); // Güncel listeyi getir
  //   });
  // }

}
