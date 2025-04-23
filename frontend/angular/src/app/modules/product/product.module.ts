import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductRoutingModule } from './product-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailComponent } from './components/product-details/product-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ProductListComponent, ProductDetailComponent],
  imports: [CommonModule, ProductRoutingModule, HttpClientModule,FormsModule,RouterModule,ReactiveFormsModule]
})


export class ProductModule {}

