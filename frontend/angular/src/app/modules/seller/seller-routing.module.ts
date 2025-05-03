import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreManagementComponent } from './components/store-management/store-management.component';


const routes: Routes = [
  { path: 'store-management', component: StoreManagementComponent },
  { path: '**', component: StoreManagementComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule {}
