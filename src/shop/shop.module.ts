import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BasketModule } from "src/basket/basket.module";
import { ShopItem } from "./shop-item.entity";
import { ShopController } from "./shop.controller";
import { ShopService } from "./shop.service";

@Module({
  imports: [
    // przerobienie na Active Record - nie trzeba korzytać z repozytoria
    // TypeOrmModule.forFeature([ ShopItem ]),
    forwardRef(() => BasketModule)
  ],
  controllers: [ShopController],
  providers: [ShopService],
  exports: [ShopService], // wyeksportowanie serwisu, tak żeby jego zawartość była dostępna w innych modułach.
})
export class ShopModule {

}