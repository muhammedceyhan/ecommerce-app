import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from '../../services/admin-dashboard.service';
import { AuthService } from '../../../../modules/auth/services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private dashboardService: AdminDashboardService,private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
  this.dashboardService.getStats().subscribe({
    next: (stats) => {
      this.totalUsers = stats.totalUsers;
      this.totalProducts = stats.totalProducts;
      this.totalOrders = stats.totalOrders;
    },
    error: (err) => {
      console.error('Dashboard verisi yüklenemedi:', err);
    }
  });
}


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
