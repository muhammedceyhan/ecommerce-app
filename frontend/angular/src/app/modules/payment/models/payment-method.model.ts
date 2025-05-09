export interface PaymentMethod {
  id?: number;
  userId: number;
  cardHolderName: string;
  cardNumber: string;
  expirationDate: string;
  cvc: string;
}
