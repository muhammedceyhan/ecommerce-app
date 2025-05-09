import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UsersOrdersComponent } from './components/users-orders/users-orders.component';
import { UsersOrdersRoutingModule } from './users-orders-routing.module';

@NgModule({
  declarations: [
    UsersOrdersComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    UsersOrdersRoutingModule
  ]
})
export class UsersOrdersModule { }
