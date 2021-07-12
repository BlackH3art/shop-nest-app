import { Injectable } from '@nestjs/common';
import { AddProductToBasketResponse, DeleteProductFromBasketResponse } from 'src/interfaces/basket';
import { AddProductDto } from './dto/add-product.dto';

@Injectable()
export class BasketService {
  private items: AddProductDto[] = [];

  add(item: AddProductDto): AddProductToBasketResponse {

    // walidacja, jeśli któryś z warunków jest spełniony, nie dodawaj do koszyka
    if(
      typeof item.name !== 'string' || 
      typeof item.count !== 'number' ||
      item.name === '' || 
      item.count < 1
    ) {
      return {
        isSuccess: false,
      };
    }

    // dodaj do koszyka
    this.items.push(item);

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
}
