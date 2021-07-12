export type AddProductToBasketResponse = {
  isSuccess: true;
  index: number;
} | {
  isSuccess: false;
}

export interface DeleteProductFromBasketResponse {
  isSuccess: boolean;
}