import { NavbarComponent } from './modules/shared/components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor'; // kendi doğru yoluna göre güncelle!

import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { OrdersComponent } from './modules/seller/components/orders/orders.component';

import { NgChartsModule } from 'ng2-charts';

import { PaymentMethodsComponent } from './modules/payment/components/payment-methods/payment-methods.component';
import { errorInterceptor }  from './core/interceptors/error.interceptor';



  @NgModule({
  declarations: [AppComponent, NavbarComponent, OrdersComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    NgChartsModule



  ],
  providers: [
    provideClientHydration(withEventReplay()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true, // Birden fazla interceptor'ı çalıştırabilmek için 'multi' özelliği aktif
    },


    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor, // 👈 BU SATIR AKTİF OLSUN
      multi: true,
    },

    provideHttpClient(withFetch()), // 👈 sadece bunu ekle
    //{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }


    provideHttpClient(withFetch()),  // 👈 sadece bunu ekle
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
