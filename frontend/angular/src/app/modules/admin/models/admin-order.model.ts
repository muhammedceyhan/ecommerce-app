export interface AdminOrder {
  id: number;
  userId: number;
  userEmail: string;
  purchaseDate: string;
  status: 'PREPARING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'; // Şu anda PREPARING kullanıyoruz
}
