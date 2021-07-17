import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasketModule } from './basket/basket.module';
import { ShopModule } from './shop/shop.module';

// usunięcie BasketController i BasketService - wydzielenie osobego modułu.
// usunięcie ShopController i ShopService - wydzielenie osobnego modułu.

@Module({
  imports: [
    BasketModule,
    ShopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// zapobieganie problemowi: circular reference gdzie jeden moduł korzysta z drugiego i ten drugi z pierwszego.
// forwardRef( () => NazwaServicuLubModułu)