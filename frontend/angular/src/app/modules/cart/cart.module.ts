import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartRoutingModule } from './cart-routing.module';
import { FormsModule } from '@angular/forms';
import { AddressComponent } from '../auth/components/address/address.component';

@NgModule({
  declarations: [CartPageComponent,CheckoutComponent,AddressComponent], // en az bir component tanımı olabilir
  imports: [CommonModule,CartRoutingModule,FormsModule]
})
export class CartModule {}
