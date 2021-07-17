import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BasketService } from 'src/basket/basket.service';
import { GetAllProductsResponse } from 'src/interfaces/shop';

@Injectable()
export class ShopService {

  constructor(
    @Inject(forwardRef(() => BasketService)) private basketService: BasketService
  ) {

  }

  getProducts(): GetAllProductsResponse {
    return [
      { id: 1, name: "kajak", category: "woda", description: "Jeśli już przeżyjesz śmiercionośną pandemię bezobjawowego wirusa to z tym kajakiem możesz się zabić spływając z wodospadu Niagara.", price: 123.12 - this.basketService.countPromotion()},
      { id: 2, name: "wiosło", category: "woda", description: "Samomachające wiosło, wspaniałe wykończenie, ciekawa tekstura, niebywały smak.", price: 23.12 - this.basketService.countPromotion()},
      { id: 3, name: "krzesło", category: "boks", description: "Świtny zamiennik białego ręcznika, jeżeli nie ma takowego pod ręką, zawsze można w sędziego rzucić krzesłem.", price: 13.32},
    ]
  }

  hasProduct(name: string): boolean {
    return this.getProducts().some((item) => item.name === name)
  }

  getPriceOfProduct(name: string): number {
    return this.getProducts().find(item => item.name === name).price;
  }
}
