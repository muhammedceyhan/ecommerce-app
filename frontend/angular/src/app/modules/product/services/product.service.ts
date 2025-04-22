import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private mockProducts: Product[] = [
    {
      id: 0,
      name: 'Elma',
      description: 'Taze kırmızı elma',
      price: 5,
      imageUrl: './elma.jpeg',
      stock: 20,
      inCartNumber: 0,
    },
    {
      id: 1,
      name: 'Armut',
      description: 'Lezzetli sarı armut',
      price: 6,
      imageUrl: './armut.png',
      stock: 12,
      inCartNumber: 0,
    }
  ];

  constructor() {}

  getAll(): Observable<Product[]> {
    return of(this.mockProducts); // HTTP yerine mock veri döner
  }

  getById(id: number): Product{
    const product = this.mockProducts[id];
    return product;
  }
}
