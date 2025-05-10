import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Address } from '../models/address.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private baseUrl = `${environment.apiUrl}/addresses`;

  constructor(private http: HttpClient) {}

  getAddressesByUser(userId: number): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.baseUrl}/user/${userId}`);
  }

  addAddress(userId: number, address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.baseUrl}/add?userId=${userId}`, address);
  }
  getDefaultAddress(userId: number): Observable<Address> {
    return this.http.get<Address>(`${this.baseUrl}/user/${userId}/default`);
  }

}