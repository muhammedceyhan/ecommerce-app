import { Component, OnInit } from '@angular/core';
import { PaymentMethod } from '../../models/payment-method.model';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss'],
  standalone:false
})
export class PaymentMethodsComponent implements OnInit {
  paymentMethods: PaymentMethod[] = [];
  newMethod: PaymentMethod = {
    userId: 0,
    cardHolderName: '',
    cardNumber: '',
    expirationDate: '',
    cvc: ''
  };

  constructor(
    private paymentService: PaymentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user && user.id) {
      this.newMethod.userId = user.id;
      this.loadCards(user.id);
    }
  }

  loadCards(userId: number) {
    this.paymentService.getPaymentMethodsByUser(userId).subscribe({
      next: (cards) => (this.paymentMethods = cards),
      error: () => alert('Kartlar alınamadı.')
    });
  }

  addCard() {
    if (!this.newMethod.cardNumber || !this.newMethod.expirationDate || !this.newMethod.cvc)
      return alert('Lütfen tüm alanları doldurun.');

    this.paymentService.addPaymentMethod(this.newMethod).subscribe({
      next: (card) => {
        this.paymentMethods.push(card);
        this.newMethod = { ...this.newMethod, cardHolderName: '', cardNumber: '', expirationDate: '', cvc: '' };
        alert('Kart başarıyla eklendi.');
      },
      error: () => alert('Kart eklenemedi.')
    });
  }

  deleteCard(id: number) {
    this.paymentService.deletePaymentMethod(id).subscribe({
      next: () => {
        this.paymentMethods = this.paymentMethods.filter(card => card.id !== id);
        alert('Kart silindi.');
      },
      error: () => alert('Kart silinemedi.')
    });
  }
}
