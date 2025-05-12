// src/app/modules/seller/services/seller-stats.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SellerStats } from '../models/seller-stats.model';
import { environment } from '../../../../environments/environment';
@Injectable({ providedIn: 'root' })
export class SellerStatsService {
  private apiUrl = `${environment.apiUrl}/seller/dashboard/stats`;

  constructor(private http: HttpClient) {}

  getStats(): Observable<SellerStats> {
    return this.http.get<SellerStats>(this.apiUrl);
  }
}
