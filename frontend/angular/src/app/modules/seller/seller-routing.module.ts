import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreManagementComponent } from './components/store-management/store-management.component';
import { AddProductComponent } from './components/add-product/add-product.component';


const routes: Routes = [
  { path: 'store-management', component: StoreManagementComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'edit-product/:id', component: AddProductComponent }, // ✅ Edit için route
  { path: '**', redirectTo: 'store-management' }
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule {}
