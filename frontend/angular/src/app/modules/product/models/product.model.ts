
export interface Product{
  id? : number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock:number;
  category?:string;
  discountPercentage: number;
  rating: number;
  isInSale: boolean;
}
