import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerGuard } from '../../core/guards/seller.guard';
import { SellerDashboardComponent } from './components/dashboard/seller-dashboard/seller-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: SellerDashboardComponent,
    canActivate: [SellerGuard]
  },
  // ileride ek ürün yönetim rotaları ekleyebilirsin
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule {}
