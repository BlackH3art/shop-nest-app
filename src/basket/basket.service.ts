import { Injectable } from '@nestjs/common';
import { AddProductToBasketResponse } from 'src/interfaces/basket';
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
}
