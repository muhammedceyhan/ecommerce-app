import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductListAdminComponent } from './components/product-list-admin/product-list-admin.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { OrderManagementComponent } from './components/order-management/order-management.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { AdminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent,canActivate: [AdminGuard] },
  { path: 'products', component: ProductListAdminComponent },
  { path: 'products/create', component: ProductCreateComponent },
  { path: 'products/edit/:id', component: ProductEditComponent },
  { path: 'orders', component: OrderManagementComponent },
  { path: 'users', component: UserManagementComponent },
  { path: 'admin/users', component: UserManagementComponent, canActivate: [AdminGuard] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
