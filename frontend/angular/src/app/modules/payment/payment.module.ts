import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentRoutingModule } from './payment-routing.module';
import { FormsModule } from '@angular/forms';
import { PaymentMethodsComponent } from './components/payment-methods/payment-methods.component';

@NgModule({
  declarations: [PaymentMethodsComponent],
  imports: [CommonModule, PaymentRoutingModule, FormsModule],
})
export class PaymentModule {}
