import { Injectable } from '@nestjs/common';
import { GetAllProductsResponse } from 'src/interfaces/shop';

@Injectable()
export class ShopService {

  getProducts(): GetAllProductsResponse {
    return [
      { id: 1, name: "kajak", category: "woda", description: "Jeśli już przeżyjesz śmiercionośną pandemię bezobjawowego wirusa to z tym kajakiem możesz się zabić spływając z wodospadu Niagara.", price: 123.12},
      { id: 2, name: "wiosło", category: "woda", description: "Samomachające wiosło, wspaniałe wykończenie, ciekawa tekstura, niebywały smak.", price: 23.12},
      { id: 3, name: "krzesło", category: "boks", description: "Świtny zamiennik białego ręcznika, jeżeli nie ma takowego pod ręką, zawsze można w sędziego rzucić krzesłem.", price: 13.32},
    ]
  }
}
