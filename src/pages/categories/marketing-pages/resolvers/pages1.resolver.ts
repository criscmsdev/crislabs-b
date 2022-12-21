import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { connectionFromArraySlice } from 'graphql-relay';
import { ListPage, MarketingPage1 } from 'src/common/entities/page.model';
import { MarketingPages1Service } from '../services/pages1.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';

@Resolver(() => MarketingPage1)
export class MarketingPages1Resolver {
  constructor(private readonly pages1Service: MarketingPages1Service) {}

  @Mutation(() => MarketingPage1, { name: 'marketingCreatePage1' })
  createPage(@Args('inputCreate') inputCreate: CreatePage) {
    return this.pages1Service.create(inputCreate);
  }
  @Mutation(() => MarketingPage1, { name: 'marketingUpdatePage1' })
  updatePage(
    @Args('inputUpdate') inputUpdate: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.pages1Service.update(inputUpdate);
  }

  @Mutation(() => MarketingPage1, { name: 'marketingUpdateImagePage1' })
  updateImage(@Args('inputImage') inputImage: UpdateImage) {
    return this.pages1Service.updateImage(inputImage);
  }

  @Mutation(() => String, { name: 'marketingDeletePage1' })
  deletePage(@Args('id') id: string) {
    return this.pages1Service.deletePage(id);
  }

  @Mutation(() => [String], { name: 'marketingDeletePages1' })
  deletePagesById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    return this.pages1Service.deletePagesById(ids);
  }

  @Mutation(() => String, { name: 'marketingDeleteAllPages1' })
  deleteAllPages() {
    return this.pages1Service.deleteAllPages();
  }

  @Query(() => MarketingPage1, { name: 'marketingGetPage1' })
  findPage(@Args('id') id: string) {
    return this.pages1Service.findPage(id);
  }

  @Query(() => [MarketingPage1], { name: 'marketingGetPages1' })
  findPages() {
    return this.pages1Service.findPages();
  }

  @Query(() => [MarketingPage1], { name: 'marketingGetPages1ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.pages1Service.findPagesByParentId(parentId);
  }

  @Query(() => ListPage, { name: 'marketingGetPages1WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ): Promise<ListPage> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.pages1Service.all(
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

  // @ResolveField('page', () => [Page1Marketing], { nullable: 'itemsAndList' })
  // getPage(@Parent() { _id }: Page0Marketing) {
  //   return this.pages1Service.findPagesByParentId(_id.toString());
  // }
}
