export interface OrderResponse {
    orderId: number;
    status: string;                 // "success" | "failed" | "pending"
    message?: string;
    clientSecret?: string;          // Stripe için ödeme yapılacaksa (optional)
  }