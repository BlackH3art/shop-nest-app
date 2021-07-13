import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { AddProductToBasketResponse, DeleteProductFromBasketResponse, GetTotalPriceResponse, listOfProductsInBasketResponse } from 'src/interfaces/basket';
import { BasketService } from './basket.service';
import { AddProductDto } from './dto/add-product.dto';

@Controller('basket')
export class BasketController {
  constructor(
    @Inject(BasketService) private basketService: BasketService,
  ) {}

  @Post('/')                                // metoda POST na główny adres kontrolera '/basket'
  addProductToBasket(                       // funkcja jaka ma być wywołana po otrzymaniu tej metody
    @Body() item: AddProductDto             // przekazanie co otrzymuję w body.request
  ): AddProductToBasketResponse {           // jaki response zwraca wfunkcja
    return this.basketService.add(item);    // response 
  }


  @Delete('/:index')                                    // metoda DELETE na główny adress kontrolera z przekazanym indeksem '/basket/1'
  deleteProductFromBasket( 
    @Param('index') index: string,                      //odebranie parametru (odebrane parametry są stringami)
  ): DeleteProductFromBasketResponse {                  // response jaki jest zwracany
    return this.basketService.remove(Number(index));    // response
  }

  @Get('/')
  listOfProductsInBasket(): listOfProductsInBasketResponse {
    return this.basketService.list();
  }

  @Get('/total-price')
  getTotalPrice(): GetTotalPriceResponse {
    return this.basketService.getTotalPrice();
  }
}
