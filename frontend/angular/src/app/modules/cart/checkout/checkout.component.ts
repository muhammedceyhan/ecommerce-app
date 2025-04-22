import { Component } from '@angular/core';
declare var Stripe: any;

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})

export class CheckoutComponent {
  stripe: any;

  constructor() {
    this.stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY'); // ← kendi anahtarın
  }

  checkout(): void {
    this.stripe.redirectToCheckout({
      lineItems: [
        { price: "price_1RGjIjRs8KJ5Rk101ggdKRws", quantity: 1 } // Stripe'ta tanımlı ürünün price_id'si
      ],
      mode: 'payment',
      successUrl: 'http://localhost:4200/success',
      cancelUrl: 'http://localhost:4200/cancel',
    }).then((result: any) => {
      if (result.error) {
        alert(result.error.message);
      }
    });
  }
}
