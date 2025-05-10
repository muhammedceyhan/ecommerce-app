import { AuthUser } from '../../../../modules/auth/models/user.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../../modules/auth/services/auth.service';
import { CartService } from '../../../cart/services/cart.service';
import { FavoritesService } from '../../../favorites/services/favorites.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: false
})
export class ProductListComponent implements OnInit {

  //[x: string]: any;
  searchTerm = ""
  alertMessage: string | null = null;
  favorites: number[] = [];  // Favori ürün ID'leri
  products: Product[] = [];
  private cartService: CartService;
  constructor(private productService: ProductService, private router: Router, public authService: AuthService,
     cartService: CartService,   private favoritesService: FavoritesService  // 🔴 EKLENMESİ GEREKEN KISIM
) {
    this.cartService = cartService;
    this.productService.getAllProducts().subscribe(data => this.products = data);
  }

  ngOnInit(): void {
  this.productService.getAllProducts().subscribe(data => this.products = data);

  const userId = this.authService.getUserId();
  if (userId) {
    this.favoritesService.getFavoritesByUser(userId).subscribe({
      next: (data) => {
        this.favorites = data.map(fav => fav.productId);
      }
    });
  }
}

isFavorite(productId: number): boolean {
  return this.favorites.includes(productId);
}


toggleFavorite(productId: number): void {
  const userId = this.authService.getUserId();
  if (!userId) return;

  const isFav = this.isFavorite(productId);
  if (isFav) {
    // frontend'deki favori listemizde ID'yi bul
    this.favoritesService.getFavoritesByUser(userId).subscribe(favs => {
      const match = favs.find(f => f.productId === productId);
      if (match && match.id) {
        this.favoritesService.removeFavorite(match.id).subscribe(() => {
          this.favorites = this.favorites.filter(id => id !== productId);
        });
      }
    });
  } else {
    this.favoritesService.addFavorite({ userId, productId }).subscribe(fav => {
      this.favorites.push(productId);
    });
  }
}



  goToCart(){
    this.router.navigate(['/cart'])
  }
  showSearchResults(): Product[] {
    let showedProducts: Product[] = [];
    this.products.forEach(product => {
      if(product.name.toLowerCase().includes(this.searchTerm.toLowerCase())){
        showedProducts.push(product);
      }
    });
    return showedProducts;
  }

  logout(): void {
    this['authService'].logout();
    this.router.navigate(['/login']);
  }

  //temperary add product button
  addProduct(){
    let newProduct: Product = {
      name: "New Product",
      sellerId: 1,
      price: 20,
      description: "New Product Description",
      stock: 10,
      imageUrl: "",
      category: "New Category",
      discountPercentage: 10,
      rating: 10,
      isInSale: true
    }
    this.productService.addProduct(newProduct).subscribe(data => {
      this.products.push(data);
    });
  }
  goToLogin(){
    this.router.navigate(['/login'])
  }
  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
  manageStore(){
    if(this.isLoggedIn()){
      const role = this.authService.getUserRole();

      if(role == "ROLE_SELLER"){
        this.router.navigate(['/seller/store-management'])
      }
      else{
        alert("You are not authorized to access this page.")
      }
    }
    else{
      alert("Please Log in!")
      this.router.navigate(['/login']);
    }
  }


  addToCart(productId: number): void {
    const userId = this.authService.getUserId();
    
    if (userId) {
      this.cartService.addProductToCart(userId, productId).subscribe({
        next: (res) => {
          if (res) {
            this.showAlert("✅ Ürün sepete eklendi!");
          }else{
          this.showAlert("🚨 Ürün eklenemedi")
          }
        },
        error: (err) => {
          console.error(err);
          this.showAlert("🚨 Bir hata oluştu!");
        }
      });
    }
  }

showAlert(message: string): void {
  this.alertMessage = message;
  setTimeout(() => {
    this.alertMessage = null;
  }, 3000);
}

viewDetails(productId: number | undefined) {
  if (productId) {
      this.router.navigate(['/products', productId]);
  } else {
      alert('Ürün ID bulunamadı.');
  }
}



}
