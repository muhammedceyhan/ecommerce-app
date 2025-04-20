import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductDetailsComponent } from './modules/product/components/product-list/product-details/product-details.component';
import { CartPageComponent } from './modules/cart/cart-page/cart-page.component';
import { CheckoutComponent } from './modules/cart/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailsComponent,
    CartPageComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
