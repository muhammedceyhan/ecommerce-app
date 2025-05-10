
import { Component, AfterViewInit, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../services/cart.service';
import { CartItem } from '../models/cart.model';
import { OrderRequest } from '../models/OrderRequest';
import { OrderResponse } from '../models/OrderResponse';
import { AuthService } from '../../auth/services/auth.service';
import { Address } from '../../auth/models/address.model';
import { AddressService } from '../../auth/services/address.service';


declare var Stripe: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: false
})

export class CheckoutComponent implements AfterViewInit, OnInit {
  paymentMethod = 'Credit Card';
  shippingAddress = '';
  note = '';
  stripe: any;
  card: any;
  cartItems: CartItem[] = [];
  addingAddress = false

  selectedAddressId: number | null = null;
  addresses: Address[] = [];
  newAddress: Address = {
    title: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
    isDefault: false
  };

  
  userAddresses: Address[] = [];

  userCards: { last4: string }[] = [
    { last4: '4242' },
    { last4: '1111' }
  ];
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
  addNewAddress(){
    this.addingAddress = true;
  }
  addAddress() {
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


  addNewCard() {
    alert('Yeni kart ekleme özelliği yakında aktif olacak.');
  }


  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private authService: AuthService,
    private addressService: AddressService
  ) {
    if(authService.getUserId()){
      this.userId = this.authService.getUserId() ?? 1;
    }
    this.addressService.getDefaultAddress(this.userId).subscribe(address=> {
      if(address){
      this.shippingAddress = `${address.title} - ${address.street}, ${address.city}, ${address.country} (${address.postalCode})`;
      }else{
        this.addingAddress = true
      }
    })

  }
  userId = 1; // Gerçek projede AuthService'den alınmalı

  

  ngAfterViewInit(): void {
    if (this.paymentMethod === 'Credit Card') {
      this.stripe = Stripe('pk_test_51RLjXdQawFGxfZWi57ntlcVj0mpdmn51jdNatsOpesmxhlk4j6qPpAwqHGEKJSwrfGhobc5SNp9J76TntnMKlOFA00IXBUVnlX'); // PUBLISHABLE KEY buraya
      const elements = this.stripe.elements();
      this.card = elements.create('card');
      this.card.mount('#card-element');


      this.card.on('change', (event: any) => {
        const displayError = document.getElementById('card-errors');
        if (event.error && displayError) {
          displayError.textContent = event.error.message;
        } else if (displayError) {
          displayError.textContent = '';
        }
      });
    }

    // Sepet ürünlerini al
    this.cartService.getCartedProducts(this.userId).subscribe(items => {
      this.cartItems = items;
    });
  }

  async submitOrder() {

    if (this.paymentMethod == 'Credit Card') {
      const { paymentMethod, error } = await this.stripe.createPaymentMethod({
        type: 'card',
        card: this.card
      });

      if (error) {
        alert('Ödeme hatası: ' + error.message);
        return;
      }

      const orderRequest: OrderRequest = {
        shippingAddress: this.shippingAddress,
        note: this.note,
        paymentMethod: 'Credit Card',
        paymentMethodId: paymentMethod.id,
        cartItems: this.cartItems
      };
      console.log('🛒 OrderRequest:', orderRequest);

      this.cartService.checkout(this.userId, orderRequest).subscribe({
        next: (response: OrderResponse) => {
          console.log('✅ Backend response:', response);
          if (response.clientSecret) {
            this.stripe.confirmCardPayment(response.clientSecret, {
              payment_method: paymentMethod.id // ✅ "pm_1..."
            }).then((result: { error: { message: string; }; paymentIntent: { status: string; }; }) => {
              if (result.error) {
                console.error('❌ Stripe ödeme hatası:', result.error.message);
                alert('Ödeme başarısız: ' + result.error.message);
              } else if (result.paymentIntent?.status === 'succeeded') {
                console.log('🎉 Ödeme başarıyla tamamlandı!');
                alert('Ödeme başarıyla tamamlandı!');
              }
            });
          } else {
            alert(response.message || 'Sipariş başarıyla oluşturuldu.');
          }
        },
        error: (err) => {
          alert('🚨 Sipariş gönderilemedi!');
          console.error(err);
        }
      });
    } else {
      // Kapıda ödeme
      const orderRequest: OrderRequest = {
        shippingAddress: this.shippingAddress,
        note: this.note,
        paymentMethod: 'Cash on Delivery',
        cartItems: this.cartItems
      };

      this.cartService.checkout(this.userId, orderRequest).subscribe({
        next: (response) => {
          alert(response.message || 'Kapıda ödeme ile sipariş oluşturuldu.');
        },
        error: (err) => {
          alert('🚨 Sipariş gönderilemedi!');
          console.error(err);
        }
      });
    }
  }
}
