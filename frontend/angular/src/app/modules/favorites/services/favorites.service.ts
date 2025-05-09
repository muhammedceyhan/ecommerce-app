import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Favorite } from '../models/favorite.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private apiUrl = 'http://localhost:8080/api/favorites';

  constructor(private http: HttpClient) {}

  getFavoritesByUser(userId: number): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.apiUrl}/user/${userId}`);
  }

  addFavorite(fav: Favorite): Observable<Favorite> {
    return this.http.post<Favorite>(this.apiUrl, fav);
  }

  removeFavorite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getFavoriteCountByProduct(productId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/product/${productId}/count`);
  }

  getFavoritesByUserId(userId: number): Observable<Favorite[]> {
  return this.http.get<Favorite[]>(`${this.apiUrl}/user/${userId}`);
}


}
