import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketService } from 'src/basket/basket.service';
import { GetAllProductsResponse } from 'src/interfaces/shop';
import { Repository } from 'typeorm';
import { ShopItem } from './shop-item.entity';

// const someItems = [
//   { id: 1, name: "kajak", category: "woda", description: "Jeśli już przeżyjesz śmiercionośną pandemię bezobjawowego wirusa to z tym kajakiem możesz się zabić spływając z wodospadu Niagara.", price: 123.12 - this.basketService.countPromotion()},
//   { id: 2, name: "wiosło", category: "woda", description: "Samomachające wiosło, wspaniałe wykończenie, ciekawa tekstura, niebywały smak.", price: 23.12 - this.basketService.countPromotion()},
//   { id: 3, name: "krzesło", category: "boks", description: "Świtny zamiennik białego ręcznika, jeżeli nie ma takowego pod ręką, zawsze można w sędziego rzucić krzesłem.", price: 13.32},
// ]

@Injectable()
export class ShopService {

  constructor(
    @Inject(forwardRef(() => BasketService)) private basketService: BasketService,
    // nie muszę używać repozytoria
    // @InjectRepository(ShopItem) private shopItemRepository: Repository<ShopItem>
  ) {

  }

  async getProducts(): Promise<GetAllProductsResponse> {
    // return await this.shopItemRepository.find();

    // dzięki Active record nie musimy korzystać z repozytorium 
    return await ShopItem.find();
  }

  async hasProduct(name: string): Promise<boolean> {
    return (await this.getProducts()).some((item) => item.name === name);
  }

  async getPriceOfProduct(name: string): Promise<number> {
    return (await this.getProducts()).find(item => item.name === name).price;
  }

  async getOneItem(id: string): Promise<ShopItem> {
    // return await this.shopItemRepository.findOneOrFail(id);

    return await ShopItem.findOneOrFail(id);
  }

  async deleteProduct(id: string) {
    // await this.shopItemRepository.delete(id);

    await ShopItem.delete(id);
  }

  async createProduct() {

    const newItem = new ShopItem;
    newItem.price = 9.99;
    newItem.name = 'pistolet';
    newItem.description = 'Ten pistolet strzela';

    // await this.shopItemRepository.save(newItem);

    // dzięki active record nasz item sam już posiada metodę save i może zapisać sam siebie.
    await newItem.save();

    return newItem;
  }

  async addBoughtCounter(id: string) {

    // await this.shopItemRepository.update(id, {
    //   wasEverBought: true
    // })

    await ShopItem.update(id, {
      wasEverBought: true
    })

    // const item = await this.shopItemRepository.findOneOrFail(id);

    const item = await ShopItem.findOneOrFail(id);

    item.boughtCount++

    // await this.shopItemRepository.save(item);

    await item.save();
  }
}
