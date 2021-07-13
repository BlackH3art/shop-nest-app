import { AddProductDto } from "src/basket/dto/add-product.dto"

export type AddProductToBasketResponse = {
  isSuccess: true;
  index: number;
} | {
  isSuccess: false;
}

export interface DeleteProductFromBasketResponse {
  isSuccess: boolean;
}

export type listOfProductsInBasketResponse = AddProductDto[];

export type GetTotalPriceResponse = number | { isSuccess: false, alternativeBasket: AddProductDto[]};