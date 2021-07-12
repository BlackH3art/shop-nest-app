import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AddProductToBasketResponse } from 'src/interfaces/basket';
import { BasketService } from './basket.service';
import { AddProductDto } from './dto/add-product.dto';

@Controller('basket')
export class BasketController {
  constructor(
    @Inject(BasketService) private basketService: BasketService
  ) {}

  @Post('/')                                // metoda POST na główny adres kontrolera '/basket'
  addProductToBasket(                       // funkcja jaka ma być wywołana po otrzymaniu tej metody
    @Body() item: AddProductDto             // przekazanie co otrzymuję w body.request
  ): AddProductToBasketResponse {           // jaki response zwraca wfunkcja
    return this.basketService.add(item);    // response 
  }
}
