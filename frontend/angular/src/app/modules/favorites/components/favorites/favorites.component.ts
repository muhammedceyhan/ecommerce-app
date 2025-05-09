import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Favorite } from '../../models/favorite.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  standalone: false
})
export class FavoritesComponent implements OnInit {
  favorites: Favorite[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId !== null) {
      this.favoritesService.getFavoritesByUserId(userId).subscribe({
        next: (data) => {
          console.log('Favoriler:', data); // Konsolda gözlemle
          this.favorites = data;
        },
        error: (err) => {
          console.error('Favoriler alınamadı:', err);
        }
      });
    }
  }

  removeFromFavorites(id: number) {
    this.favoritesService.removeFavorite(id).subscribe(() => {
      this.favorites = this.favorites.filter(f => f.id !== id);
    });
  }
}
