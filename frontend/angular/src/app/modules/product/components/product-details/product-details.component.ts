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
  product!: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService,
    private router: Router, private cartService:CartService) {
      const id = Number(this.route.snapshot.paramMap.get('id'));
        this.productService.getProductById(id).subscribe(data => {
        this.product = data;
      });
    }

  //initliazes the product list
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
        this.productService.getProductById(id).subscribe(data => {
        this.product = data;
      });


  }

  //Navigates to previous page
  goBack() {
    this.router.navigate(['/products']);
  }

  goToCart(){
    this.router.navigate(['/cart']);
  }

  // Adds products to cart
  addToCart() {
    if(this.product.inCartNumber < this.product.stock){
        this.product.inCartNumber++;
    }else{
      alert("Can't be add to cart more than stock.");
    }
    this.updateProductDatabase(this.product);
  }

  updateProductDatabase(product: Product) {
    this.productService.updateProduct(product).subscribe(data => {
      product = data;
    });
  }
}
