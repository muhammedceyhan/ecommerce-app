import { User } from '../../../auth/models/user.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  standalone: false
})
export class ProductListComponent implements OnInit {
  searchTerm = ""

  products: Product[] = [];


  constructor(private productService: ProductService, private router: Router) {
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

  //temperary add product button
  addProduct(){
    let newProduct: Product = {
      name: "New Product",
      price: 20,
      description: "New Product Description",
      stock: 10,
      imageUrl: "",
      inCartNumber: 5,
      category: "New Category",
      discountPercentage: 10,
      rating: 10,
      isFavorite: true,
      isInWishlist: true,
      isInCompare: true,
      isInSale: true
    }
    this.productService.addProduct(newProduct).subscribe(data => {
      this.products.push(data);
    });

  }
}
