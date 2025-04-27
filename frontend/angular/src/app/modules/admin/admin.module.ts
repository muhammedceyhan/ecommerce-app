import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router'; // 🔴 BUNU EKLE

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductListAdminComponent } from './components/product-list-admin/product-list-admin.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { OrderManagementComponent } from './components/order-management/order-management.component';

import { AdminProductService } from './services/admin-product.service';
import { UserManagementComponent } from './components/user-management/user-management.component';

@NgModule({
  declarations: [
    ProductListAdminComponent,
    ProductCreateComponent,
    ProductEditComponent,
    OrderManagementComponent,
    DashboardComponent,
    OrderManagementComponent,
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AdminRoutingModule,
    RouterModule,
  ],
  providers: [AdminProductService],
})
export class AdminModule {}
