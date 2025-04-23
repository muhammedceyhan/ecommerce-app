import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../../modules/auth/services/auth.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  standalone: false
})
export class ProductListComponent implements OnInit {
  searchTerm = ""

  products: Product[] = [];


  constructor(private productService: ProductService, private router: Router,private authService: AuthService) {
    this.productService.getAll().subscribe(data => this.products = data);
  }

  ngOnInit(): void {

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
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
