import { Component, OnInit } from '@angular/core';
import { ReviewService, Review } from '../../../product/services/review.service';
import { Product } from '../../../product/models/product.model';
import { ProductService } from '../../../product/services/product.service';

@Component({
  selector: 'app-admin-review',
  templateUrl: './admin-review.component.html',
  styleUrls: ['./admin-review.component.scss'],
  standalone: false
})
export class AdminReviewComponent implements OnInit {
  allReviews: { product: Product; review: Review }[] = [];
  filteredReviews: { product: Product; review: Review }[] = [];
  hideBadReviews: boolean = false;
  searchTerm: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  sortField: 'product' | 'rating' | 'date' = 'product';
  selectedReview: { product: Product; review: Review } | null = null;


  constructor(
    private reviewService: ReviewService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadAllReviews();
  }

  loadAllReviews() {
    this.productService.getAllProducts().subscribe(products => {
      products.forEach(product => {
        this.reviewService.getReviewsByProduct(product.id!).subscribe(reviews => {
          reviews.forEach(review => {
            this.allReviews.push({ product, review });
            this.filteredReviews = [...this.allReviews];
          });
        });
      });
    });
  }

  deleteReview(reviewId: number): void {
    if (confirm('Bu yorumu silmek istiyor musunuz?')) {
      this.reviewService.deleteReview(reviewId).subscribe(() => {
        this.allReviews = this.allReviews.filter(r => r.review.id !== reviewId);
        this.applyFilters();
      });
    }
  }

  applyFilters(): void {
    const search = this.searchTerm.toLowerCase();

   this.filteredReviews = this.allReviews.filter(entry => {
  const matchesSearch = entry.product.name.toLowerCase().includes(search) ||
                        entry.review.comment.toLowerCase().includes(search);

  const matchesRating = this.hideBadReviews ? entry.review.rating > 3 : true;

  return matchesSearch && matchesRating;});

this.filteredReviews.sort((a, b) => {
  let aVal: any, bVal: any;

  if (this.sortField === 'product') {
    aVal = a.product.name.toLowerCase();
    bVal = b.product.name.toLowerCase();
  } else if (this.sortField === 'rating') {
    aVal = a.review.rating;
    bVal = b.review.rating;
  } else if (this.sortField === 'date') {
    aVal = a.review.commentDate ? new Date(a.review.commentDate) : new Date(0);
    bVal = b.review.commentDate ? new Date(b.review.commentDate) : new Date(0);
  }

  if (aVal > bVal) {
    return this.sortDirection === 'asc' ? 1 : -1;
  } else if (aVal < bVal) {
    return this.sortDirection === 'asc' ? -1 : 1;
  } else {
    return 0;
  }
});
  }

 changeSort(criteria: 'product' | 'rating' | 'date') {
  this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  this.filteredReviews.sort((a, b) => {
    if (criteria === 'product') {
      return this.sortDirection === 'asc'
        ? a.product.name.localeCompare(b.product.name)
        : b.product.name.localeCompare(a.product.name);
    } else if (criteria === 'rating') {
      return this.sortDirection === 'asc'
        ? a.review.rating - b.review.rating
        : b.review.rating - a.review.rating;
    } else if (criteria === 'date') {
      return this.sortDirection === 'asc'
        ? new Date(a.review.commentDate || 0).getTime() - new Date(b.review.commentDate || 0).getTime()
        : new Date(b.review.commentDate ||0).getTime() - new Date(a.review.commentDate ||0).getTime();
    }
    return 0;
  });
}

  openModal(entry: { product: Product; review: Review }) {
    this.selectedReview = entry;
  }


}

