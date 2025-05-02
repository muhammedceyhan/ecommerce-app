import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product/services/product.service';
import { Product } from '../../product/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-management',
  templateUrl: './store-management.component.html',
  standalone: false,
})
export class StoreManagementComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private productService: ProductService,
     private authService:AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    const userId = this.authService.getUserId(); // Buradan doğru userId geliyor mu?
    console.log('Logged in user ID:', userId);
    if (userId != null) {
      this.productService.getProductsByLoggedUser().subscribe(
        (products) => {
          console.log('Products:', products);
          this.products = products;
        },
        (error) => {
          console.error('Error fetching products', error);
        }
      );
    }

  }

  loadProducts(): void {
    this.productService.getProductsByLoggedUser().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.error('Failed to load products', error);
      }
    });
  }
  deleteProduct(productId: number){
    console.log('not working for now');
  }
}
