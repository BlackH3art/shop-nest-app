import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AddProductToBasketResponse, DeleteProductFromBasketResponse, GetTotalPriceResponse, listOfProductsInBasketResponse } from 'src/interfaces/basket';
import { ShopService } from 'src/shop/shop.service';
import { AddProductDto } from './dto/add-product.dto';

@Injectable()
export class BasketService {
  private items: AddProductDto[] = [];

  constructor(
    @Inject(forwardRef(() => ShopService)) private shopService: ShopService
  ) {

  }

  add(item: AddProductDto): AddProductToBasketResponse {

    // walidacja, jeśli któryś z warunków jest spełniony, nie dodawaj do koszyka
    if(
      typeof item.name !== 'string' || 
      typeof item.count !== 'number' ||
      item.name === '' || 
      item.count < 1 ||
      !this.shopService.hasProduct(item.name)
    ) {
      return {
        isSuccess: false,
      };
    }

    // dodaj do koszyka
    this.items.push(item);

    this.shopService.addBoughtCounter(item.id);

    // wydrukuj listę rzeczy w koszyku
    console.log('Lista rzeczy w koszyku --> ', this.items);
    
    // zwróć czy udało się zapisać przedmiot w koszyku
    return {
      isSuccess: true,
      index: this.items.length - 1,
    }
  }

  remove(index: number): DeleteProductFromBasketResponse {

    // sprawdzenie czy z przekazanym indeksem jest wszystko w porządku
    if(index < 0 || index >= this.items.length) return { isSuccess: false }

    // usunięcie danego przedmiotu o wskazanym indeksie
    this.items.splice(index, 1);

    // pokaż zawartość basket po usunięciu jednego przedmiotu
    console.log('Lista przedmiotów w koszyku po usunięci', this.items);

    return {
      isSuccess: true
    }
  }

  list(): listOfProductsInBasketResponse {
    return this.items
  }

  async getTotalPrice(): Promise<GetTotalPriceResponse> {

    if(!this.items.every(item => this.shopService.hasProduct(item.name))) {

      const alternativeBasket = this.items.filter(item => this.shopService.hasProduct(item.name))

      return {
        isSuccess: false,
        alternativeBasket,
      }
    }

    return (await Promise.all(

      this.items
        .map(async item => (await this.shopService.getPriceOfProduct(item.name)) * item.count * 1.23)))
        .reduce((prev, curr) => prev + curr, 0)
  }

  async countPromotion(): Promise<number> {
    return (await this.getTotalPrice()) > 10 ? 1 : 0;
  }

}
