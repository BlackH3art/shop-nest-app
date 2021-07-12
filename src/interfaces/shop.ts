export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
}

export type GetAllProductsResponse = Product[];