import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Review {
  id?: number;
  productId: number;
  userId: number;
  orderId: number;
  comment: string;
  rating: number;
  commentDate?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private baseUrl = 'http://localhost:8080/api/reviews';

  constructor(private http: HttpClient) {}

  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.baseUrl}`, review);
  }

  deleteReview(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getReviewsByProduct(productId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/product/${productId}`);
  }

  getReviewsByUser(userId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/user/${userId}`);
  }

  canUserReview(userId: number, productId: number): Observable<{ canReview: boolean, orderId?: number }> {
  return this.http.get<{ canReview: boolean, orderId?: number }>(`${this.baseUrl}/can-review/${userId}/${productId}`);
}

}
