import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  CreateProduct,
  UpdateDetailsProduct,
  UpdateProduct,
  UpdateSpecsProduct,
} from 'src/common/dto/product.input';
import {
  CreateHardwareStoreProduct,
  UpdateHardwareStoreProduct,
} from 'src/common/dto/product/hardware-store.input';
import { UpdateImageProduct } from 'src/common/dto/site.input';
import { Product } from 'src/common/entities/product.model';
import { ProductDocument } from 'src/common/entities/product.schema';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { slug } from 'utils/function';
import { ToolProductsRepository } from './hardware-store-products.repository';

@Injectable()
export class HardwareStoreProductsService {
  constructor(
    private readonly toolProductsRespository: ToolProductsRepository,
  ) {}

  async create(input: CreateProduct) {
    let data;
    switch (slug(input.type)) {
      case 'tool':
        data = await this.toolProductsRespository.create(input);
        break;

      default:
        console.log(`Sorry, we are out of ${input.type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(
        `there is no "${input.type}" category`,
      );
    }
    // const data = await this.toolProductsRespository.create(input);
    return this.toModel(data);
  }

  async update(input: UpdateProduct) {
    let data;
    switch (slug(input.type)) {
      case 'tool':
        data = await this.toolProductsRespository.update(input);
        break;

      default:
        console.log(`Sorry, we are out of ${input.type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(
        `there is no "${input.type}" category`,
      );
    }
    // const data = await this.toolProductsRespository.create(input);
    return this.toModel(data);
  }

  async updateSpecs(input: UpdateSpecsProduct) {
    let data;
    switch (slug(input.type)) {
      case 'tool':
        data = await this.toolProductsRespository.updateSpecs(input);
        break;

      default:
        console.log(`Sorry, we are out of ${input.type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(
        `there is no "${input.type}" category`,
      );
    }
    // const data = await this.toolProductsRespository.create(input);
    return this.toModel(data);
  }

  async updateDetails(input: UpdateDetailsProduct) {
    let data;
    switch (slug(input.type)) {
      case 'tool':
        data = await this.toolProductsRespository.updateDetails(input);
        break;

      default:
        console.log(`Sorry, we are out of ${input.type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(
        `there is no "${input.type}" category`,
      );
    }
    // const data = await this.toolProductsRespository.create(input);
    return this.toModel(data);
  }

  async updateImage(input: UpdateImageProduct) {
    let data;
    switch (slug(input.type)) {
      case 'tool':
        data = await this.toolProductsRespository.updateImage(input);

        break;

      default:
        console.log(`Sorry, we are out of ${input.type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(
        `there is no "${input.type}" category`,
      );
    }
    // const data = await this.toolProductsRespository.create(input);
    return this.toModel(data);
  }

  async deleteProduct(id: string, type: string) {
    switch (slug(type)) {
      case 'tool':
        await this.toolProductsRespository.deleteOne({ _id: id });
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    return id;
  }

  async deleteProducts(ids: string[], type: string) {
    switch (slug(type)) {
      case 'tool':
        await this.toolProductsRespository.deleteMany({ _id: { $in: ids } });
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    return ids;
  }
  async getProduct(id: string, type: string) {
    let data;
    switch (slug(type)) {
      case 'tool':
        data = await this.toolProductsRespository.findOne({ _id: id });
        break;

      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return this.toModel(data);
  }
  getProducts(type: string) {
    let data;
    switch (slug(type)) {
      case 'tool':
        data = this.toolProductsRespository.find({});
        break;

      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return data;
  }

  getProductsByParentId(type: string, parentId: string) {
    let data;
    switch (slug(type)) {
      case 'tool':
        data = this.toolProductsRespository.find({ parentId: parentId });
        break;

      default:
        console.log(`Sorry, we are out of ${type}.`);
        data = [];
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return data;
  }

  all(pagination: ListInput, type: string, parentId: string) {
    let data;
    switch (slug(type)) {
      case 'tool':
        data = this.toolProductsRespository.All(pagination, {
          parentId: parentId,
        });
        break;

      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return data;
  }

  private toModel({
    _id,
    dataProduct,
    slug,
    siteId,
    parentId,
  }: ProductDocument): Product {
    return {
      _id: _id.toHexString(),
      dataProduct: dataProduct,
      slug: slug,
      siteId: siteId,
      parentId: parentId,
    };
  }
}
