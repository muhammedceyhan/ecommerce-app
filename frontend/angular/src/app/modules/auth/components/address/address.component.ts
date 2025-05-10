
import { Component, OnInit } from '@angular/core';
import { Address } from '../../models/address.model';
import { AddressService } from '../../services/address.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  standalone: false
})
export class AddressComponent implements OnInit {

  selectedAddressId: number | null = null;
  shippingAddress: any;
  addresses: Address[] = [];
  newAddress: Address = {
    title: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
    isDefault: false
  };


  constructor(
    private addressService: AddressService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.addressService.getAddressesByUser(userId).subscribe(addresses => {
        this.addresses = addresses;
      });
    }
  }

  onAddressSelected() {
    const selected = this.addresses.find(addr => addr.id === this.selectedAddressId);
    if (selected) {
      this.shippingAddress = `${selected.title} - ${selected.street}, ${selected.city}, ${selected.country} (${selected.postalCode})`;
    }
  }

  addAddress(): void {
    const userId = this.authService.getUserId();
    if (!userId) return;
    console.log(this.newAddress)
    this.addressService.addAddress(userId, this.newAddress).subscribe(saved => {
      
      this.addresses.push(saved);
      this.newAddress = {
        title: '',
        street: '',
        city: '',
        postalCode: '',
        country: '',
        isDefault: false
      };
    });
  }
}