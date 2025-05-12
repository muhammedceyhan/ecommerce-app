import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { AddProductComponent } from './components/add-product/add-product.component';

import { StoreManagementComponent } from './components/store-management/store-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SellerReviewComponent } from './components/seller-review/seller-review.component';

@NgModule({
  declarations: [StoreManagementComponent, DashboardComponent,
    ProductsComponent, AddProductComponent, SellerReviewComponent,
    ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SellerModule { }
