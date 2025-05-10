import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreManagementComponent } from './components/store-management/store-management.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { SellerReviewComponent } from './components/seller-review/seller-review.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrdersComponent } from './components/orders/orders.component';


const routes: Routes = [
  { path: 'store-management', component: StoreManagementComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'edit-product/:id', component: AddProductComponent }, // ✅ Edit için route
  {
  path: 'reviews',component: SellerReviewComponent},
  { path: 'dashboard', component: DashboardComponent },
    { path: 'orders', component: OrdersComponent }, // ⬅️ BU SATIRI EKLE

  { path: '**', redirectTo: 'store-management' }
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule {}
