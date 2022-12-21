import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { connectionFromArraySlice } from 'graphql-relay';
import {
  DataPage,
  HardwareStorePage2,
  HardwareStorePage3,
  ListPage,
  Page,
} from 'src/common/entities/page.model';
import { HardwareStorePages2Service } from '../services/pages2.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { HardwareStorePages3Service } from '../services/pages3.service';
import { HardwareStoreProductsService } from 'src/products/categories/hardware-store-products/hardware-store-products.service';
import { Product } from 'src/common/entities/product.model';

@Resolver(() => HardwareStorePage2)
export class HardwareStorePages2Resolver {
  constructor(
    private readonly pages2Service: HardwareStorePages2Service,
    private readonly pages3Service: HardwareStorePages3Service,
    private readonly productsService: HardwareStoreProductsService,
  ) {}

  @Mutation(() => HardwareStorePage2, { name: 'hardwareStoreCreatePage2' })
  createPage(@Args('inputCreate') inputCreate: CreatePage) {
    return this.pages2Service.create(inputCreate);
  }
  @Mutation(() => HardwareStorePage2, { name: 'hardwareStoreUpdatePage2' })
  updatePage(
    @Args('inputUpdate') inputUpdate: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.pages2Service.update(inputUpdate);
  }

  @Mutation(() => HardwareStorePage2, { name: 'hardwareStoreUpdateImagePage2' })
  updateImage(@Args('inputImage') inputImage: UpdateImage) {
    return this.pages2Service.updateImage(inputImage);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeletePage2' })
  deletePage(@Args('id') id: string) {
    return this.pages2Service.deletePage(id);
  }

  @Mutation(() => [String], { name: 'hardwareStoreDeletePages2' })
  deletePagesById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    return this.pages2Service.deletePagesById(ids);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeleteAllPages2' })
  deleteAllPages() {
    return this.pages2Service.deleteAllPages();
  }

  @Query(() => HardwareStorePage2, { name: 'hardwareStoreGetPage2' })
  findPage(@Args('id') id: string) {
    return this.pages2Service.findPage(id);
  }

  @Query(() => [HardwareStorePage2], { name: 'hardwareStoreGetPages2' })
  findPages() {
    return this.pages2Service.findPages();
  }

  @Query(() => [HardwareStorePage2], {
    name: 'hardwareStoreGetPages2ByParentId',
  })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.pages2Service.findPagesByParentId(parentId);
  }

  @Query(() => ListPage, { name: 'hardwareStoreGetPages2WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ): Promise<ListPage> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.pages2Service.all(
      {
        limit,
        offset,
      },
      parentId,
    );
    const page = connectionFromArraySlice(data, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }

  @ResolveField('pages', () => [HardwareStorePage3], {
    nullable: 'itemsAndList',
  })
  getPage(@Parent() { _id }: HardwareStorePage2) {
    return this.pages3Service.findPagesByParentId(_id.toString());
  }

  @ResolveField('products', () => [Product], {
    nullable: 'itemsAndList',
  })
  getProduct(@Parent() { _id, dataPage }: HardwareStorePage2) {
    const { type } = dataPage as DataPage;
    return this.productsService.getProductsByParentId(type, _id.toString());
  }
}
