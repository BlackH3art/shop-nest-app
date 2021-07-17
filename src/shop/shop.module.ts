import { Module } from "@nestjs/common";
import { ShopController } from "./shop.controller";
import { ShopService } from "./shop.service";

@Module({
  controllers: [ShopController],
  providers: [ShopService],
  exports: [ShopService], // wyeksportowanie serwisu, tak żeby jego zawartość była dostępna w innych modułach.
})
export class ShopModule {

}