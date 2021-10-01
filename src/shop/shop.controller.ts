import { Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateProductResponse, GetAllProductsResponse, GetOneProductResponse } from 'src/interfaces/shop';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {

  constructor(
    @Inject(ShopService) private shopService: ShopService,
  ) {}

  @Get('/')
  getProductsList(): Promise<GetAllProductsResponse> {
    return this.shopService.getProducts();
  }

  @Get('/find/:searchTerm')
  testFindItem(
    @Param('searchTerm') searchTerm: string, 
  ): Promise<GetAllProductsResponse> {
    return this.shopService.findProducts(searchTerm);
  }

  @Get('/:id')
  getOneProduct(
    @Param('id') id: string
  ): Promise<GetOneProductResponse> {
    return this.shopService.getOneItem(id);
  }

  @Delete('/:id')
  deleteEntity(
    @Param('id') id: string
  ) {
    this.shopService.deleteProduct(id);
  }

  @Post('/add')
  createNewProduct(): Promise<CreateProductResponse> {
    return this.shopService.createProduct();
  }
}
