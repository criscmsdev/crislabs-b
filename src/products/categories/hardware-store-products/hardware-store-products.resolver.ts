import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
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
import {
  ListHardwareStoreProduct,
  Product,
} from 'src/common/entities/product.model';
// import {
//   ListHardwareStoreProduct,
//   HardwareStoreProduct,
// } from 'src/common/entities/products/hardwareStore.model';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { HardwareStoreProductsService } from './hardware-store-products.service';

@Resolver()
export class HardwareStoreProductsResolver {
  constructor(
    private readonly hardwareStoreProductsService: HardwareStoreProductsService,
  ) {}

  @Mutation(() => Product, { name: 'hardwareStoreCreateProduct' })
  create(@Args('inputCreate') inputCreate: CreateProduct) {
    return this.hardwareStoreProductsService.create(inputCreate);
  }

  @Mutation(() => Product, { name: 'hardwareStoreUpdateProduct' })
  update(@Args('inputUpdate') inputUpdate: UpdateProduct) {
    return this.hardwareStoreProductsService.update(inputUpdate);
  }
  @Mutation(() => Product, { name: 'hardwareStoreUpdateSpecsProduct' })
  updateSpecs(@Args('inputUpdateSpecs') inputUpdateSpecs: UpdateSpecsProduct) {
    return this.hardwareStoreProductsService.updateSpecs(inputUpdateSpecs);
  }
  @Mutation(() => Product, { name: 'hardwareStoreUpdateDetailsProduct' })
  updateDetails(
    @Args('inputUpdateDetails') inputUpdateDetails: UpdateDetailsProduct,
  ) {
    return this.hardwareStoreProductsService.updateDetails(inputUpdateDetails);
  }

  @Mutation(() => Product, {
    name: 'hardwareStoreUpdateProductImage',
  })
  updateImage(@Args('inputImage') inputImage: UpdateImageProduct) {
    return this.hardwareStoreProductsService.updateImage(inputImage);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeleteProduct' })
  delete(@Args('id') id: string, @Args('type') type: string) {
    return this.hardwareStoreProductsService.deleteProduct(id, type);
  }

  @Mutation(() => [String], { name: 'hardwareStoreDeleteProducts' })
  deleteSites(
    @Args('ids', { type: () => [String] }) ids: string[],
    @Args('type') type: string,
  ) {
    return this.hardwareStoreProductsService.deleteProducts(ids, type);
  }

  @Query(() => Product, { name: 'hardwareStoreGetProduct' })
  getSite(@Args('id') id: string, @Args('type') type: string) {
    return this.hardwareStoreProductsService.getProduct(id, type);
  }

  @Query(() => [Product], { name: 'hardwareStoreGetProducts' })
  getProducts(@Args('type') type: string) {
    return this.hardwareStoreProductsService.getProducts(type);
  }

  @Query(() => ListHardwareStoreProduct, {
    name: 'hardwareStoreGetProductsWithCursor',
  })
  async hardwareStoreGetProductsWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('type') type: string,
    @Args('parentId') parentId: string,
  ): Promise<ListHardwareStoreProduct> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.hardwareStoreProductsService.all(
      {
        limit,
        offset,
      },
      type,
      parentId,
    );
    const page = connectionFromArraySlice(data, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });
    return { page, pageData: { count, limit, offset } };
  }
}
