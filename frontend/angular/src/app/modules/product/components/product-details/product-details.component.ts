
import { CommonModule } from '@angular/common';

import { CartService } from './../../../cart/services/cart.service';
import { Product } from './../../models/product.model';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

import { Review, ReviewService } from '../../services/review.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone: false,
})
export class ProductDetailsComponent implements OnInit {

  alertMessage: string | null = null;
  product!: Product;
  userId = 0;
  favoriteCount: number = 0;
  reviews: Review[] = [];
  newReview: Review = {
    productId: 0,
    userId: 0,
    orderId: 0,
    comment: '',
    rating: 0
  };
  canReview: boolean = false;
  isSeller: boolean = false;
  averageRating: number = 0;
  productQuantityInCart: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    public authService: AuthService,
    private reviewService: ReviewService
  ) {
    // Anonim kullanıcılar için ürün detayını görebilme
    this.userId = this.authService.getUserId() ?? 0;
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const role = this.authService.getUserRole();
    this.isSeller = role === 'ROLE_SELLER';
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (data) => {
          console.log('Ürün Detayı:', data);
          this.product = data;
          this.loadReviews();
          this.checkCanReview();
          this.loadProductQuantityInCart();
          this.productService.getFavoriteCount(this.product.id!).subscribe({
            next: (count) => this.favoriteCount = count,
            error: () => console.warn('Favori sayısı alınamadı.')
          });
        },
        error: (err) => console.error('Failed to load product', err)
      });
    }
  }


  loadProduct(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (data: Product) => {
          this.product = data;
          this.loadProductQuantityInCart();
        },
        (error) => console.error('Product load error:', error)
      );
    }
  }

  addToCart(): void {
    if (this.userId) {
      this.cartService.addProductToCart(this.userId, this.product.id!).subscribe(
        () => {
          console.log('Product added to cart successfully');
          this.showAlert('Ürün sepete eklendi!');
          this.loadProductQuantityInCart();
        },
        (error) => {
          console.error('Error adding product to cart:', error);
          this.showAlert('Ürün sepete eklenemedi!');
        }
      );
    } else {
      alert('Please Log in!');
      this.router.navigate(['/login']);
    }
  }

  showAlert(message: string): void {
    this.alertMessage = message;
    setTimeout(() => {
      this.alertMessage = null;
    }, 3000);
  }



  goBack(): void {
    this.router.navigate(['/products']);
  }


  goToCart(): void {
    this.router.navigate(['/cart']);
  }


  getDiscountedPrice(): number {
    return this.product.price * (1 - this.product.discountPercentage / 100);
  }

  // product-details.component.ts
loadProductQuantityInCart(): void {
  // Sadece login olmuş (userId>0) kullanıcılar için sorgu at
  if (this.userId > 0 && this.product?.id) {
    this.cartService
      .getProductQuantityInCart(this.userId, this.product.id)
      .subscribe(
        qty => this.productQuantityInCart = qty,
        err => console.error('Sepet miktarı alınamadı:', err)
      );
  } else {
    this.productQuantityInCart = 0; // ya da başka bir default değer
  }
}


  loadReviews(): void {
    if (!this.product?.id) return;
    this.reviewService.getReviewsByProduct(this.product.id).subscribe({
      next: (res) => {
        this.reviews = res;
        if (res.length > 0) {
          const total = res.reduce((sum, r) => sum + r.rating, 0);
          this.averageRating = total / res.length;
        } else {
          this.averageRating = 0;
        }
      },
      error: () => console.warn('Yorumlar alınamadı')
    });
  }

 checkCanReview(): void {
  if (this.userId && this.product?.id) {
    this.reviewService.canUserReview(this.userId, this.product.id).subscribe({
      next: (res) => {
        this.canReview = res.canReview;
        if (res.orderId) {
          this.newReview.orderId = res.orderId;
        }
      },
      error: () => {
        console.warn('Yorum yapılabilirlik kontrolü başarısız oldu.');
        this.canReview = false;
      }
    });
  }
}


  submitReview(): void {
  if (!this.product?.id || !this.userId) {
    return alert('Lütfen önce giriş yapın!');
  }
  this.newReview = {
    ...this.newReview,
    userId: this.userId,
    productId: this.product.id,
  };

  this.reviewService.addReview(this.newReview).subscribe({
  next: () => this.loadReviews(),
  error: (err: any) => {
    // err artık string veya {message:string}
    const text = typeof err === 'string'
      ? err
      : err.message || err.error?.message || 'Bilinmeyen hata';
    alert(text);
  }
});

}


  deleteReview(reviewId: number): void {
    if (confirm('Yorumu silmek istediğinize emin misiniz?')) {
      this.reviewService.deleteReview(reviewId).subscribe({
        next: () => this.reviews = this.reviews.filter(r => r.id !== reviewId),
        error: () => alert('Yorum silinemedi.')
      });
    }
  }


}
