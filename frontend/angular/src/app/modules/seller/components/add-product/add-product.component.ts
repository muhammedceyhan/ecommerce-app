import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerService } from '../../services/seller.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  standalone: false,
})
export class AddProductComponent implements OnInit {

  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sellerService: SellerService,
    private authService: AuthService
  ) {}


  showAddForm = false;

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      imgUrl: ['', Validators.required],
      sellerId: [null, Validators.required]  // BUNUN OLMASI ŞART!
    });
  }

  submitProduct(): void {
    console.log("✅ SubmitProduct() çalıştı!");
    if (this.productForm.valid) {
      const productData = {
        ...this.productForm.value,
        sellerId: 3 // 👈 bunu elle ekle
        //sellerId: this.authService.getUserId()
      };

      console.log('Product to add:', productData);  // ✅ Konsol için

      this.sellerService.addProduct(productData).subscribe({
        next: () => {
          alert('Product added successfully!');
          this.productForm.reset();
        },
        error: (err) => {
          console.error('Error adding product:', err);
          alert('Failed to add product.');
        }
      });
    } else {
      alert('Please fill in all fields correctly.');
    }
  }


}
