import { ExternalProductDto } from './dto/external-product.dto';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductsDataService } from './products-data.service';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Product } from './interfaces/products.interface';
import { dateToArray } from '../shared/helpers/date.helper';
import { Post, Delete, Put, Get, Body, Param, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { RoleGuard } from '../shared/guards/role.guard';
@Controller('products')
export class ProductsController {
  constructor(private productRepository: ProductsDataService) {}

  @Post()
  @UseGuards(RoleGuard)
  addProduct(
    @Body()
    _item_: CreateProductDTO,
  ): ExternalProductDto {
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
  deleteProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): void {
    return this.productRepository.deleteProduct(id);
  }

  @Put(':id')
  updateProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateProductDTO,
  ): ExternalProductDto {
    return this.mapProductToExternal(
      this.productRepository.updateProduct(id, dto),
    );
  }

  @Get(':id')
  getProductById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): ExternalProductDto {
    return this.mapProductToExternal(this.productRepository.getProductById(id));
  }

  @Get() getAllProducts(): Array<ExternalProductDto> {
    return this.productRepository
      .getAllProducts()
      .map(this.mapProductToExternal);
  }
}
