export interface AdminProduct {
  id?: number;
  name: string;
  price: number;
  stock: number;
  description?: string;
  category?: string;
  imageUrl?: string;
}
