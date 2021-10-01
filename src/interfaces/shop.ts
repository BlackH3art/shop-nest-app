import { ShopItem } from "src/shop/shop-item.entity";

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
}

export type GetAllProductsResponse = Product[];

export type GetOneProductResponse = ShopItem;

export type CreateProductResponse = ShopItem;

export interface GetPaginatedListOfProductsResponse {
  items: ShopItem[];
  pagesCount: number;
}