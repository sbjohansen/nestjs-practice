import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/products.interface';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ExternalProductDto } from './dto/external-product.dto';
import { v4 as uuidv4 } from 'uuid';
import { dateToArray } from '../shared/helpers/date.helper';

@Injectable()
export class ProductsDataService {
  private products: Array<Product> = [];

  addProduct(_item_: CreateProductDTO): ExternalProductDto {
    const product: Product = {
      ..._item_,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.push(product);
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
    };
  }

  deleteProduct(id: string): void {
    this.products = this.products.filter((product) => product.id !== id);
  }

  updateProduct(id: string, dto: UpdateProductDTO): Product {
    const product = this.getProductById(id);
    const index = this.products.findIndex((item) => item.id === id);
    this.products[index] = { ...product, ...dto, updatedAt: new Date() };
    return this.products[index];
  }

  getProductById(id: string): Product {
    return this.products.find((product) => product.id === id);
  }

  getAllProducts(): Array<Product> {
    return this.products;
  }
}
