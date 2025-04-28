import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminProductService } from '../../services/admin-product.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
  standalone: false
})
export class ProductCreateComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: AdminProductService,
    private router: Router,
    private location: Location
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      description: [''],
      category: [''],
      imageUrl: [''],
      inCartNumber: [0],
      discountPercentage: [0],
      rating: [0],
      isFavorite: [false],
      isInWishlist: [false],
      isInCompare: [false],
      isInSale: [false]
    });
  }

  
  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    this.productService.createProduct(this.productForm.value).subscribe({
      next: () => {
        alert('Ürün başarıyla eklendi!');
        this.router.navigate(['/admin/products']);
      },
      error: (err) => {
        console.error('Ürün ekleme hatası:', err);
        alert('Ürün eklenemedi!');
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
