import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/categories`;
  private categories: Category[] = [];

  constructor(private http: HttpClient) {
    this.getAllCategoriesObservable().subscribe(categories => {
      this.categories = categories;
    })
  }

  createCategory(category: { name: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, category);
  }
  
  

  getAllCategoriesObservable(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl).pipe(
      tap(data => this.categories = data)
      
    );
  }
  getAllCategoriesArray(): Category[] {
    return this.categories;
  }

  // Cache’i temizlemek istersen
  clearCache() {
    this.categories = [];
  }
}