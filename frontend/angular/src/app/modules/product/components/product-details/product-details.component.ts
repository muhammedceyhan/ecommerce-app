
import { CommonModule } from '@angular/common';
import { CartService } from './../../../cart/services/cart.service';
import { Product } from './../../models/product.model';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    public authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private reviewService: ReviewService
    ) {
    const temp = this.authService.getUserId();
    if(temp == null) {
     if (isPlatformBrowser(this.platformId)) {
       alert('Şifre hatalı!');
      }
      this.router.navigate(['/login']);
    }
    else{
      this.userId = temp;
    }
  }



  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const role = this.authService.getUserRole();
    this.isSeller = role === 'ROLE_SELLER';
    if (id) {
        this.productService.getProductById(id).subscribe({
            next: (data) => {
                console.log('Ürün Detayı:', data);  // <-- EKLE
                this.product = data;
                this.loadReviews();
                this.checkCanReview();
                // Ürün detayını çektikten hemen sonra:
                this.loadProductQuantityInCart();
                this.productService.getFavoriteCount(this.product.id!).subscribe({
                  next: (count) => this.favoriteCount = count,
                  error: () => console.warn('Favori sayısı alınamadı.')
              });

            },
            error: (err) => {
                console.error('Failed to load product', err);
            }
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
        (error) => {
          console.error('Product load error:', error);
        }
      );
    }
  }


// Ürünü sepete ekle
addToCart(): void {
  if(this.userId != null) {
    this.cartService.addProductToCart(this.userId, this.product.id!).subscribe(
      (response) => {
        console.log('Product added to cart successfully');
        this.showAlert('Ürün sepete eklendi!');
        this.loadProductQuantityInCart();
      },
      (error) => {
        console.error('Error adding product to cart:', error);
        this.showAlert('Ürün sepete eklenemedi!');
      }
    );
  }
  else{
    alert("Please Log in!");
    this.router.navigate(['/login']);
  }
}

showAlert(message: string): void {
  this.alertMessage = message;
  setTimeout(() => {
    this.alertMessage = null;
  }, 3000);
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


loadReviews(): void {
  if (!this.product?.id) return;

  console.log("çalışmayooo")

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
  // Burada istersen backend'den "teslim edilmiş sipariş" olup olmadığını kontrol edebilirsin.
  // Şimdilik bu kontrolü basitçe true yapıyoruz (backend zaten kontrol ediyor)
  this.canReview = true;
}

submitReview(): void {
  if (!this.product?.id || !this.userId) return;

  this.newReview.userId = this.userId;
  this.newReview.productId = this.product.id;
  this.newReview.orderId = 1; // ✅ Sipariş ID'si burada geçici, ileride dinamik yapılacak

  this.reviewService.addReview(this.newReview).subscribe({
    next: () => {
      this.loadReviews();
      this.newReview = {
        productId: this.product.id!,
        userId: this.userId,
        orderId: 0,
        comment: '',
        rating: 0
      };
    },
    error: err => alert(err.error || 'Yorum eklenemedi')
  });
}


deleteReview(reviewId: number): void {
  if (confirm('Yorumu silmek istediğinize emin misiniz?')) {
    this.reviewService.deleteReview(reviewId).subscribe({
      next: () => {
        this.reviews = this.reviews.filter(r => r.id !== reviewId);
      },
      error: () => {
        alert('Yorum silinemedi.');
      }
    });
  }
}


}
