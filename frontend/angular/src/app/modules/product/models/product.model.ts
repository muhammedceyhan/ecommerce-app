
export interface Product{
  id? : number;
  name: string;
  sellerId : number;
  description: string;
  price: number;
  imageUrl: string;
  stock:number;

  discountPercentage: number;
  rating: number;
  isInSale: boolean;
  categoryId: number; // ürün hangi kategoriye ait
  categoryName: string; // ❗ artık bunu kullanacaksın
}
