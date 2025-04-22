import { Component, OnInit } from '@angular/core';
import { AdminProductService } from '../../services/admin-product.service';
import { AdminProduct } from '../../models/admin-product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list-admin',
  templateUrl: './product-list-admin.component.html',
  styleUrls: ['./product-list-admin.component.scss'],
  standalone: false
})
export class ProductListAdminComponent implements OnInit {
  products: AdminProduct[] = [];

  constructor(
    private productService: AdminProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Ürünler alınamadı:', err);
      }
    });
  }

  editProduct(id: number): void {
    this.router.navigate(['/admin/products/edit', id]);
  }

  deleteProduct(id: number): void {
    if (confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.fetchProducts(); // Listeyi güncelle
      });
    }
  }
}
