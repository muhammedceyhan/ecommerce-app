import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { Product } from '../../../product/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: false,
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private sellerService: SellerService) {}

  ngOnInit(): void {
    this.loadSellerProducts();
  }

  loadSellerProducts() {
    this.sellerService.getSellerProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error(err);
        alert('Failed to load products.');
      }
    });
  }
}
