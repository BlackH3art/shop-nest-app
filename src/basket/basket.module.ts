import { forwardRef, Module } from "@nestjs/common";
import { ShopModule } from "src/shop/shop.module";
import { BasketController } from "./basket.controller";
import { BasketService } from "./basket.service";


@Module({
  // ShopModule musi eksportować używane przez inne moduły serwisy, 
  // a zaś chcąc używać serwisu z innego modułu trzeba go zaimportować
  imports: [
    forwardRef(() => ShopModule)
  ], 
  controllers: [BasketController],
  providers: [BasketService],
  exports: [BasketService]
})
export class BasketModule {

}