import { ExternalProductDto } from './dto/external-product.dto';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductsDataService } from './products-data.service';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Product } from './interfaces/products.interface';
import { dateToArray } from '../shared/helpers/date.helper';
import { Post, Delete, Put, Get, Body, Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private productRepository: ProductsDataService) {}

  @Post()
  addProduct(@Body() _item_: CreateProductDTO): ExternalProductDto {
    return this.productRepository.addProduct(_item_);
  }

  mapProductToExternal(product: Product): ExternalProductDto {
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
    };
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): void {
    return this.productRepository.deleteProduct(id);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() dto: UpdateProductDTO,
  ): ExternalProductDto {
    return this.mapProductToExternal(
      this.productRepository.updateProduct(id, dto),
    );
  }

  @Get(':id')
  getProductById(@Param('id') id: string): ExternalProductDto {
    return this.mapProductToExternal(this.productRepository.getProductById(id));
  }

  @Get() getAllProducts(): Array<ExternalProductDto> {
    return this.productRepository
      .getAllProducts()
      .map(this.mapProductToExternal);
  }
}
