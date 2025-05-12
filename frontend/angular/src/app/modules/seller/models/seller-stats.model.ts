// src/app/modules/seller/models/seller-stats.model.ts
export interface TopProduct {
  productId: number;
  productName: string;
  quantitySold: number;
}

export interface SellerStats {
  totalSales: number;
  totalRevenue: number;
  topProducts: TopProduct[];
}
