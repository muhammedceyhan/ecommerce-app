import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerService } from '../../services/seller.service';
import { AuthService } from '../../../auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../product/models/category.model';
import { CategoryService } from '../../../product/services/category.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  standalone: false,
})
export class AddProductComponent implements OnInit {
  @Output() productAdded = new EventEmitter<void>();
  productForm!: FormGroup;
  isEditMode = false;
  currentProductId: number | null = null;
  categories: Category[] = [];
  selectedCategoryId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private sellerService: SellerService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      categoryId: [null, Validators.required], // ← kategori ID için
      imgUrl: ['', Validators.required],
    })

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.currentProductId = +id;
        this.sellerService.getProductById(this.currentProductId).subscribe({
          next: (product) => {
            if (product) {
              this.productForm.patchValue(product);
            } else {
              console.error('Ürün bulunamadı!');
            }
          },
          error: (err) => {
            console.error('Ürün getirilemedi:', err);
          }
        });
      }
    });

    this.waitHalfSecond()
  }
  async waitHalfSecond() {
    await new Promise(resolve => setTimeout(resolve, 500));
    this.categories = this.categoryService.getAllCategoriesArray();
  }

  submitProduct(): void {
    if (this.productForm.invalid) {
      alert('Lütfen tüm alanları doğru doldurun.');
      return;
    }

    const productData = {
      ...this.productForm.value,
      sellerId: this.authService.getUserId(),
    };

    if (this.isEditMode && this.currentProductId) {
      this.sellerService.updateProduct(this.currentProductId, productData).subscribe({
        next: () => {
          alert('Ürün başarıyla güncellendi!');
          this.router.navigate(['/seller/store-management']);
        },
        error: (err) => {
          console.error('Güncelleme hatası:', err);
          alert('Ürün güncellenemedi.');
        }
      });
    } else {
      this.sellerService.addProduct(productData).subscribe({
        next: () => {
          alert('Ürün başarıyla eklendi!');
          this.router.navigate(['/seller/store-management']);
        },
        error: (err) => {
          console.error('Ekleme hatası:', err);
          alert('Ürün eklenemedi.');
        }
      });

    }
  }

  goBack(): void {
    this.router.navigate(['/seller/store-management']);
  }

}
