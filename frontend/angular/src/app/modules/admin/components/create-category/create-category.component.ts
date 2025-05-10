import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../product/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
  standalone: false
})
export class CreateCategoryComponent {
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  createCategory() {
    if (this.categoryForm.valid) {
      const newCategory = this.categoryForm.value;
      this.categoryService.createCategory(newCategory).subscribe({
        next: () => {
          alert('Kategori başarıyla oluşturuldu.');
          this.router.navigate(['/admin/products']);
          window.location.reload();
        },
        error: () => {
          alert('Kategori oluşturulurken hata oluştu.');
        }
      });
    }
  }
}