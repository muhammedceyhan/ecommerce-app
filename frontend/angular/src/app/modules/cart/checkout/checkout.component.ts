import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

declare var Stripe: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  standalone: false
})
export class CheckoutComponent implements OnInit {
  stripe: any;
  card: any;

  paymentMethod: string = '';
shippingAddress: string = '';
note: string = '';

constructor(
  private cartService: CartService,
  private authService: AuthService,
  private router: Router
) {}

submitOrder(): void {
  const userId = this.authService.getUserId();
  if (!userId) {
    alert('Please log in!');
    this.router.navigate(['/login']);
    return;
  }

  const orderRequest = {
    paymentMethod: this.paymentMethod,
    shippingAddress: this.shippingAddress,
    note: this.note
  };

  this.cartService.checkout(userId, orderRequest).subscribe(
    () => {
      alert('Order placed successfully!');
      this.router.navigate(['/products']);
    },
    (error: any) => {
      console.error('Checkout error:', error);
      alert('Failed to complete order.');
    }
  );
}

  async ngOnInit() {
    await this.loadStripeScript();

    this.stripe = Stripe('pk_test_51RGjCwRs8KJ5Rk107wdjWgXK61XUXbSsH0rTVOuvIHPpuZkodBVl0wtkCynKz5HoZ5A0LpQok1sAF5KQbX3bpDpW00oHT8ldqF');
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount('#card-element');  // Stripe kart input'u buraya yerleşir
  }

  loadStripeScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.querySelector('script[src="https://js.stripe.com/v3/"]')) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.onload = () => resolve();
      script.onerror = () => reject('Stripe.js yüklenemedi');
      document.body.appendChild(script);
    });
  }
}
