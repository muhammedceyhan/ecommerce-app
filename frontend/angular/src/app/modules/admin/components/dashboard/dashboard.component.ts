import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from '../../services/admin-dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  totalUsers: number = 0;
  totalProducts: number = 0;
  totalOrders: number = 0;

  constructor(private dashboardService: AdminDashboardService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.dashboardService.getStats().subscribe(stats => {
      this.totalUsers = stats.totalUsers;
      this.totalProducts = stats.totalProducts;
      this.totalOrders = stats.totalOrders;
    });
  }
}
