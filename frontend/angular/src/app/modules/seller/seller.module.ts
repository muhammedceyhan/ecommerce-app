import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerRoutingModule } from './seller-routing.module';
import { SellerDashboardComponent } from './components/dashboard/seller-dashboard/seller-dashboard.component';
@NgModule({
  declarations: [SellerDashboardComponent],
  imports: [
    CommonModule,
    SellerRoutingModule
  ]
})
export class SellerModule {}
