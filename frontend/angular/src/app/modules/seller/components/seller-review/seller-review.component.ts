import { Component, OnInit } from '@angular/core';
import { ReviewService, Review } from '../../../product/services/review.service';
import { SellerService } from '../../services/seller.service';
import { Product } from '../../../product/models/product.model';
import { AuthService } from '../../../auth/services/auth.service';




@Component({
  selector: 'app-seller-review',
  templateUrl: './seller-review.component.html',
  styleUrls: ['./seller-review.component.scss'],
  standalone:false
})
export class SellerReviewComponent implements OnInit {
  products: Product[] = [];
  productReviews: { [productId: number]: { reviews: Review[], average: number } } = {};

  constructor(
    private sellerService: SellerService,
    private reviewService: ReviewService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.sellerService.getSellerProducts().subscribe(products => {
      this.products = products;
      products.forEach(product => {
        this.reviewService.getReviewsByProduct(product.id!).subscribe(reviews => {
          const total = reviews.reduce((sum, r) => sum + r.rating, 0);
          this.productReviews[product.id!] = {
            reviews,
            average: reviews.length > 0 ? total / reviews.length : 0
          };
        });
      });
    });
  }

  deleteReview(productId: number, reviewId: number) {
    if (confirm('Yorumu silmek istiyor musunuz?')) {
      this.reviewService.deleteReview(reviewId).subscribe(() => {
        this.productReviews[productId].reviews =
          this.productReviews[productId].reviews.filter(r => r.id !== reviewId);

        const total = this.productReviews[productId].reviews.reduce((sum, r) => sum + r.rating, 0);
        this.productReviews[productId].average =
          this.productReviews[productId].reviews.length > 0
            ? total / this.productReviews[productId].reviews.length
            : 0;
      });
    }
  }
}
