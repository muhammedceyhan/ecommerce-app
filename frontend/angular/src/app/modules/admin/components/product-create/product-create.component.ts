import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminProductService } from '../../services/admin-product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
  standalone:false
})
export class ProductCreateComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: AdminProductService,
    private router: Router
  ) {
    // Form oluşturuluyor
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      description: [''],
      category: [''],
      imageUrl: ['']
    });
  }

  // Form gönderildiğinde çalışır
  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    this.productService.createProduct(this.productForm.value).subscribe({
      next: () => {
        alert('Ürün başarıyla eklendi!');
        this.router.navigate(['/admin/products']); // Liste sayfasına yönlendir
      },
      error: (err) => {
        console.error('Ürün ekleme hatası:', err);
        alert('Ürün eklenemedi!');
      }
    });
  }
}
