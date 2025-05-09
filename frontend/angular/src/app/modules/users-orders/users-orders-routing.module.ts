import { UserOrder } from './models/user-order.model';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersOrdersComponent } from './components/users-orders/users-orders.component';

const routes: Routes = [
  { path: '', component: UsersOrdersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersOrdersRoutingModule {}
