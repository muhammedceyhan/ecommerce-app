export interface Favorite {
  id?: number;
  userId: number;
  productId: number;
  productName?: string;
  productImageUrl?: string;
  productPrice?: number;
}
