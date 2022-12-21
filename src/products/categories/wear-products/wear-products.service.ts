// import { Injectable, UnprocessableEntityException } from '@nestjs/common';
// import {
//   CreateWearProduct,
//   UpdateWearProduct,
// } from 'src/common/dto/product/wear.input';
// import { UpdateImageProduct } from 'src/common/dto/site.input';
// import { WearProduct } from 'src/common/entities/products/wear.model';
// import { WearDocument } from 'src/common/entities/products/wear.schema';
// import { ListInput } from 'src/common/pagination/dto/list.input';
// import { slug } from 'utils/function';
// import { WearProductsRepository } from './wear.products.repository';

// @Injectable()
// export class WearProductsService {
//   constructor(
//     private readonly wearProductsRespository: WearProductsRepository,
//   ) {}

//   async create(input: CreateWearProduct) {
//     let data;
//     switch (slug(input.type)) {
//       case 'clothing':
//         data = await this.wearProductsRespository.create(input);
//         break;

//       default:
//         console.log(`Sorry, we are out of ${input.type}.`);
//         break;
//     }
//     if (!data) {
//       throw new UnprocessableEntityException(
//         `there is no "${input.type}" category`,
//       );
//     }
//     // const data = await this.wearProductsRespository.create(input);
//     return this.toModel(data);
//   }

//   async update(input: UpdateWearProduct) {
//     let data;
//     switch (slug(input.type)) {
//       case 'clothing':
//         data = await this.wearProductsRespository.update(input);
//         break;

//       default:
//         console.log(`Sorry, we are out of ${input.type}.`);
//         break;
//     }
//     if (!data) {
//       throw new UnprocessableEntityException(
//         `there is no "${input.type}" category`,
//       );
//     }
//     // const data = await this.wearProductsRespository.create(input);
//     return this.toModel(data);
//   }

//   async updateImage(input: UpdateImageProduct) {
//     let data;
//     switch (slug(input.type)) {
//       case 'clothing':
//         data = await this.wearProductsRespository.updateImage(input);

//         break;

//       default:
//         console.log(`Sorry, we are out of ${input.type}.`);
//         break;
//     }
//     if (!data) {
//       throw new UnprocessableEntityException(
//         `there is no "${input.type}" category`,
//       );
//     }
//     // const data = await this.wearProductsRespository.create(input);
//     return this.toModel(data);
//   }

//   async deleteProduct(id: string, type: string) {
//     switch (slug(type)) {
//       case 'clothing':
//         await this.wearProductsRespository.deleteOne({ _id: id });
//         break;
//       default:
//         console.log(`Sorry, we are out of ${type}.`);
//         break;
//     }
//     return id;
//   }

//   async deleteProducts(ids: string[], type: string) {
//     switch (slug(type)) {
//       case 'clothing':
//         await this.wearProductsRespository.deleteMany({ _id: { $in: ids } });
//         break;
//       default:
//         console.log(`Sorry, we are out of ${type}.`);
//         break;
//     }
//     return ids;
//   }
//   async getProduct(id: string, type: string) {
//     let data;
//     switch (slug(type)) {
//       case 'clothing':
//         data = await this.wearProductsRespository.findOne({ _id: id });
//         break;

//       default:
//         console.log(`Sorry, we are out of ${type}.`);
//         break;
//     }
//     if (!data) {
//       throw new UnprocessableEntityException(`there is no "${type}" category`);
//     }
//     return this.toModel(data);
//   }
//   getProducts(type: string) {
//     let data;
//     switch (slug(type)) {
//       case 'clothing':
//         data = this.wearProductsRespository.find({});
//         break;

//       default:
//         console.log(`Sorry, we are out of ${type}.`);
//         break;
//     }
//     if (!data) {
//       throw new UnprocessableEntityException(`there is no "${type}" category`);
//     }
//     return data;
//   }
//   getProductsByParentId(type: string, parentId: string) {
//     let data;
//     switch (slug(type)) {
//       case 'clothing':
//         data = this.wearProductsRespository.find({ parentId: parentId });
//         break;

//       default:
//         console.log(`Sorry, we are out of ${type}.`);
//         data = [];
//         break;
//     }
//     if (!data) {
//       throw new UnprocessableEntityException(`there is no "${type}" category`);
//     }
//     return data;
//   }

//   all(pagination: ListInput, type: string, parentId: string) {
//     let data;
//     switch (slug(type)) {
//       case 'clothing':
//         data = this.wearProductsRespository.All(pagination, {
//           parentId: parentId,
//         });
//         break;

//       default:
//         console.log(`Sorry, we are out of ${type}.`);
//         break;
//     }
//     if (!data) {
//       throw new UnprocessableEntityException(`there is no "${type}" category`);
//     }
//     return data;
//   }

//   private toModel({
//     _id,
//     dataWear,
//     slug,
//     siteId,
//     parentId,
//   }: WearDocument): WearProduct {
//     return {
//       _id: _id.toHexString(),
//       dataWear: dataWear,
//       slug: slug,
//       siteId: siteId,
//       parentId: parentId,
//     };
//   }
// }
