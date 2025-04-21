import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartRoutingModule } from './cart-routing.module';

@NgModule({
  declarations: [CartPageComponent,CheckoutComponent,], // en az bir component tanımı olabilir
  imports: [CommonModule,CartRoutingModule]
})
export class CartModule {}
