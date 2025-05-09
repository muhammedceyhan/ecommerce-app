import { CartItem } from "./cart.model";

export interface OrderRequest {
    shippingAddress: string;
    note?: string;
    paymentMethod: string;        // "Credit Card" veya "Cash on Delivery"
    paymentMethodId?: string;     // Sadece Stripe için kullanılır
    cartItems: CartItem[];        // Sepetteki ürünler
  }