import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreManagementComponent } from './store-management/store-management.component';
import { SellerRoutingModule } from './seller-routing.module';

@NgModule({
  declarations: [StoreManagementComponent],
  imports: [
    CommonModule,
    SellerRoutingModule,
  ]
})
export class SellerModule { }
