import { AuthUser } from '../../../../modules/auth/models/user.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../../modules/auth/services/auth.service';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  standalone: false
})
export class ProductListComponent implements OnInit {

  [x: string]: any;
  searchTerm = ""

  products: Product[] = [];
  private cartService: CartService;
  constructor(private productService: ProductService, private router: Router, public authService: AuthService, cartService: CartService) {
    this.cartService = cartService;
    this.productService.getAllProducts().subscribe(data => this.products = data);
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => this.products = data);
  }

  viewDetail(id: number) {
    this.router.navigate(['/products', id]);
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
        this.cartService.addProductToCart(userId, productId).subscribe(
            () => {
                console.log('Product added to cart successfully.');
            },
            (error) => {
                console.error('Error adding product to cart:', error);
            }
        );
    } else {
        alert('Please log in!');
        this.router.navigate(['/login']);
    }
}


}
