export interface AdminOrder {
  id: number;
  userId: number;
  purchaseDate: string;
  status: 'PREPARING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'; // Şu anda PREPARING kullanıyoruz
}
