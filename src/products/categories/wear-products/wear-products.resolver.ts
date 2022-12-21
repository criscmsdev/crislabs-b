// import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
// import { connectionFromArraySlice } from 'graphql-relay';
// import {
//   CreateWearProduct,
//   UpdateWearProduct,
// } from 'src/common/dto/product/wear.input';
// import { UpdateImageProduct } from 'src/common/dto/site.input';
// import {
//   ListWearProduct,
//   WearProduct,
// } from 'src/common/entities/products/wear.model';
// import ConnectionArgs, {
//   getPagingParameters,
// } from 'src/common/pagination/relay/connection.args';
// import { WearProductsService } from './wear-products.service';

// @Resolver()
// export class WearProductsResolver {
//   constructor(private readonly wearProductsService: WearProductsService) {}

//   @Mutation(() => WearProduct, { name: 'wearCreateProduct' })
//   create(@Args('inputCreate') inputCreate: CreateWearProduct) {
//     return this.wearProductsService.create(inputCreate);
//   }

//   @Mutation(() => WearProduct, { name: 'wearUpdateProduct' })
//   update(@Args('inputUpdate') inputUpdate: UpdateWearProduct) {
//     return this.wearProductsService.update(inputUpdate);
//   }

//   @Mutation(() => WearProduct, { name: 'wearUpdateProductImage' })
//   updateImage(@Args('inputImage') inputImage: UpdateImageProduct) {
//     return this.wearProductsService.updateImage(inputImage);
//   }

//   @Mutation(() => String, { name: 'wearDeleteProduct' })
//   delete(@Args('id') id: string, @Args('type') type: string) {
//     return this.wearProductsService.deleteProduct(id, type);
//   }

//   @Mutation(() => [String], { name: 'wearDeleteProducts' })
//   deleteSites(
//     @Args('ids', { type: () => [String] }) ids: string[],
//     @Args('type') type: string,
//   ) {
//     return this.wearProductsService.deleteProducts(ids, type);
//   }

//   @Query(() => WearProduct, { name: 'wearGetProduct' })
//   getSite(@Args('id') id: string, @Args('type') type: string) {
//     return this.wearProductsService.getProduct(id, type);
//   }

//   @Query(() => [WearProduct], { name: 'wearGetProducts' })
//   getProducts(@Args('type') type: string) {
//     return this.wearProductsService.getProducts(type);
//   }

//   @Query(() => ListWearProduct, { name: 'wearGetProductsWithCursor' })
//   async wearGetProductsWithCursor(
//     @Args('args') args: ConnectionArgs,
//     @Args('type') type: string,
//     @Args('parentId') parentId: string,
//   ): Promise<ListWearProduct> {
//     const { limit, offset } = getPagingParameters(args);
//     const { data, count } = await this.wearProductsService.all(
//       {
//         limit,
//         offset,
//       },
//       type,
//       parentId,
//     );
//     const page = connectionFromArraySlice(data, args, {
//       arrayLength: count,
//       sliceStart: offset || 0,
//     });
//     return { page, pageData: { count, limit, offset } };
//   }
// }
