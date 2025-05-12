export interface AdminProduct {
  id?: number;
  name: string;
  price: number;
  stock: number;
  description?: string;
  
  imageUrl?: string;
  active: boolean;
  category: { id: number; name: string }; // ✅ ekle
  seller: { id: number; email: string };  // ✅ ekle
}
