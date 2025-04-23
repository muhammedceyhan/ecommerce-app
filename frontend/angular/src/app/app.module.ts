import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { CartModule } from './modules/cart/cart.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { ProductListComponent } from './modules/product/components/product-list/product-list.component';
import { ProductDetailComponent } from './modules/product/components/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
