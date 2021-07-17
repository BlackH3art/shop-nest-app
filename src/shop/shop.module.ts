import { forwardRef, Module } from "@nestjs/common";
import { BasketModule } from "src/basket/basket.module";
import { ShopController } from "./shop.controller";
import { ShopService } from "./shop.service";

@Module({
  imports: [
    forwardRef(() => BasketModule)
  ],
  controllers: [ShopController],
  providers: [ShopService],
  exports: [ShopService], // wyeksportowanie serwisu, tak żeby jego zawartość była dostępna w innych modułach.
})
export class ShopModule {

}