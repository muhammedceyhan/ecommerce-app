import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminProductService } from '../../services/admin-product.service';
import { AdminProduct } from '../../models/admin-product.model';

@Component({
  selector: 'app-product-edit',
  
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
  standalone: false
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  productId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productService: AdminProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      description: [''],
      category: [''],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    // URL'den ürün ID'sini al
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    // Ürünü backend'den getir
    this.productService.getProductById(this.productId).subscribe((product: AdminProduct) => {
      this.productForm.patchValue(product); // Formu doldur
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    this.productService.updateProduct(this.productId, this.productForm.value).subscribe({
      next: () => {
        alert('Ürün başarıyla güncellendi!');
        this.router.navigate(['/admin/products']);
      },
      error: (err) => {
        console.error('Güncelleme hatası:', err);
        alert('Ürün güncellenemedi!');
      }
    });
  }
}
