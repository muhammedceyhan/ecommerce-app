
import { CommonModule } from '@angular/common';
import { CartService } from './../../../cart/services/cart.service';
import { Product } from './../../models/product.model';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  standalone: false,
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;
  userId = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService
  ) {
    const temp = this.authService.getUserId();
    if(temp == null) {
      alert("Please Log in!")
      this.router.navigate(['/login']);
    }
    else{
      this.userId = temp;
    }
  }


  ngOnInit(): void {

    this.loadProduct();
  }

  loadProduct(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (data: Product) => {
          this.product = data;
          this.loadProductQuantityInCart();
        },
        (error) => {
          console.error('Product load error:', error);
        }
      );
    }
  }


  // Ürünü sepete ekle
  addToCart(): void {
 // Şu anda sabit bir kullanıcı id
    if(this.userId != null) {
      this.cartService.addProductToCart(this.userId, this.product.id!).subscribe(
        (response) => {
          console.log('Product added to cart successfully');
          // İstersen burada kullanıcıya başarı mesajı gösterebilirsin
          this.loadProductQuantityInCart()
        },
        (error) => {
          console.error('Error adding product to cart:', error);
        }
      );
    }
    else{
      alert("Please Log in!")
      this.router.navigate(['/login']);
    }
  }

  // Alışveriş listesine dön
  goBack(): void {
    this.router.navigate(['/products']);
  }

  // Sepete git
  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  // İndirimli fiyatı hesapla
  getDiscountedPrice(): number {
    return this.product.price * (1 - this.product.discountPercentage / 100);
  }

  productQuantityInCart: number = 0; // Sepetteki ürün miktarını tutacak değişken

// Bu yeni method:
loadProductQuantityInCart(): void {
  if (this.product && this.product.id) {
    this.cartService.getProductQuantityInCart(this.userId, this.product.id).subscribe(
      (quantity: number) => {
        this.productQuantityInCart = quantity;
      },
      (error) => {
        console.error('Error fetching product quantity in cart:', error);
      }
    );
  }
}

}
