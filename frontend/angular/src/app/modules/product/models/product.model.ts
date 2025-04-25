
export interface Product{
  id? : number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock:number;
  category?:string;
  inCartNumber: number;
  discountPercentage: number;
  rating: number;
  isFavorite: boolean;
  isInWishlist: boolean;
  isInCompare: boolean;
  isInSale: boolean;
}
