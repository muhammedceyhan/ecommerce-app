export interface AdminOrder {
  id: number;
  userId: number;
  userEmail: string;
  purchaseDate: string;
  status: 'PREPARING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  newStatus?: 'PREPARING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
}
