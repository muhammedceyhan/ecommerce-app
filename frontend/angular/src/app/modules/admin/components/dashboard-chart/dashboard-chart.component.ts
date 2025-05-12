import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from '../../services/admin-dashboard.service';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.scss'],
  standalone: false,
})
export class DashboardChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  barChartData: ChartData<'bar'> = {
    labels: ['Kullanıcı', 'Ürün', 'Sipariş'],
    datasets: [
      {
        label: 'Sayılar',
        data: [0, 0, 0], // Dinamik hale getireceğiz
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726']
      }
    ]
  };

  barChartOptions: ChartOptions = {
    responsive: true
  };

  barChartType: 'bar' = 'bar';

  constructor(private dashboardService: AdminDashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getStats().subscribe(stats => {
      this.barChartData.datasets[0].data = [
        stats.totalUsers,
        stats.totalProducts,
        stats.totalOrders
      ];
      this.chart?.update(); // 🟢 Grafik güncellenir
    });
  }
}
