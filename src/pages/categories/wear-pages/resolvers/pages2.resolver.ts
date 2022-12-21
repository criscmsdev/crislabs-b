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
import { DataPage, ListPage, Page, WearPage2, WearPage3 } from 'src/common/entities/page.model';
import { WearPages2Service } from '../services/pages2.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { WearPages3Service } from '../services/pages3.service';
// import { WearProductsService } from 'src/products/categories/wear-products/wear-products.service';
// import { WearProduct } from 'src/common/entities/products/wear.model';

@Resolver(() => WearPage2)
export class WearPages2Resolver {
  constructor(
    private readonly pages2Service: WearPages2Service,
    private readonly pages3Service: WearPages3Service, // private readonly productsService: WearProductsService,
  ) {}

  @Mutation(() => WearPage2, { name: 'wearCreatePage2' })
  createPage(@Args('inputCreate') inputCreate: CreatePage) {
    return this.pages2Service.create(inputCreate);
  }
  @Mutation(() => WearPage2, { name: 'wearUpdatePage2' })
  updatePage(
    @Args('inputUpdate') inputUpdate: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.pages2Service.update(inputUpdate);
  }

  @Mutation(() => WearPage2, { name: 'wearUpdateImagePage2' })
  updateImage(@Args('inputImage') inputImage: UpdateImage) {
    return this.pages2Service.updateImage(inputImage);
  }

  @Mutation(() => String, { name: 'wearDeletePage2' })
  deletePage(@Args('id') id: string) {
    return this.pages2Service.deletePage(id);
  }

  @Mutation(() => [String], { name: 'wearDeletePages2' })
  deletePagesById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    return this.pages2Service.deletePagesById(ids);
  }

  @Mutation(() => String, { name: 'wearDeleteAllPages2' })
  deleteAllPages() {
    return this.pages2Service.deleteAllPages();
  }

  @Query(() => WearPage2, { name: 'wearGetPage2' })
  findPage(@Args('id') id: string) {
    return this.pages2Service.findPage(id);
  }

  @Query(() => [WearPage2], { name: 'wearGetPages2' })
  findPages() {
    return this.pages2Service.findPages();
  }

  @Query(() => [WearPage2], { name: 'wearGetPages2ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.pages2Service.findPagesByParentId(parentId);
  }

  @Query(() => ListPage, { name: 'wearGetPages2WithCursor' })
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

  @ResolveField('pages', () => [WearPage3], { nullable: 'itemsAndList' })
  getPage(@Parent() { _id }: WearPage2) {
    return this.pages3Service.findPagesByParentId(_id.toString());
  }
  // @ResolveField('products', () => [WearProduct], { nullable: 'itemsAndList' })
  // getProduct(@Parent() { _id, dataPage }: Page) {
  //   const { type } = dataPage as DataPage;
  //   return this.productsService.getProductsByParentId(type, _id.toString());
  // }
}
