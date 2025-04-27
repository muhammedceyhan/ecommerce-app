export interface CartItem {
  cartItemId: number;         // Cart tablosundaki id
  productId: number;          // Ürün ID
  productName: string;        // Ürün adı
  productImageUrl: string;    // Ürün görseli
  productPrice: number;       // Ürün fiyatı
  quantity: number;           // Sepetteki ürün adedi
}
