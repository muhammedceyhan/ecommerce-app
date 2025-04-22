import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Routes, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../../cart/services/cart.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  standalone: false
})
export class ProductDetailComponent implements OnInit {
  product?: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService,
    private router: Router, private cartService:CartService) {}

  //initliazes the product list
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getById(id);
  }
  //Navigates to previous page
  goBack() {
    this.router.navigate(['/products']);
  }

  // Adds products to cart
  addToCart(productid: number) {
    let product = this.productService.getById(productid);
    if(product.inCartNumber < product.stock){
      if(this.cartService.getCart().includes(product)){
        product.inCartNumber!++;
      }else{
        this.cartService.addToCart(product);
      }

    }else{
      alert("Can't be add to cart more than stock.");
    }
  }
}
