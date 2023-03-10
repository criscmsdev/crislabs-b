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
import { ListPage, MarketingPage0, MarketingPage1, Page } from 'src/common/entities/page.model';
import { MarketingPages0Service } from '../services/pages0.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { MarketingPages1Service } from '../services/pages1.service';

@Resolver(() => MarketingPage0)
export class MarketingPages0Resolver {
  constructor(
    private readonly pages0Service: MarketingPages0Service,
    private readonly pages1Service: MarketingPages1Service,
  ) {}

  @Mutation(() => MarketingPage0, { name: 'marketingCreatePage0' })
  createPage(@Args('inputCreate') inputCreate: CreatePage) {
    return this.pages0Service.create(inputCreate);
  }
  @Mutation(() => MarketingPage0, { name: 'marketingUpdatePage0' })
  updatePage(
    @Args('inputUpdate') inputUpdate: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.pages0Service.update(inputUpdate);
  }

  @Mutation(() => MarketingPage0, { name: 'marketingUpdateImagePage0' })
  updateImage(@Args('inputImage') inputImage: UpdateImage) {
    return this.pages0Service.updateImage(inputImage);
  }

  @Mutation(() => String, { name: 'marketingDeletePage0' })
  deletePage(@Args('id') id: string) {
    return this.pages0Service.deletePage(id);
  }

  @Mutation(() => [String], { name: 'marketingDeletePages0' })
  deletePagesById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    return this.pages0Service.deletePagesById(ids);
  }

  @Mutation(() => String, { name: 'marketingDeleteAllPages0' })
  deleteAllPages() {
    return this.pages0Service.deleteAllPages();
  }

  @Query(() => MarketingPage0, { name: 'marketingGetPage0' })
  findPage(@Args('id') id: string) {
    return this.pages0Service.findPage(id);
  }

  @Query(() => [MarketingPage0], { name: 'marketingGetPages0' })
  findPages() {
    return this.pages0Service.findPages();
  }

  @Query(() => [MarketingPage0], { name: 'marketingGetPages0ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.pages0Service.findPagesByParentId(parentId);
  }

  @Query(() => ListPage, { name: 'marketingGetPages0WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPage> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.pages0Service.all(
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

  @ResolveField('pages', () => [MarketingPage1], { nullable: 'itemsAndList' })
  getPage(@Parent() { _id }: MarketingPage0) {
    return this.pages1Service.findPagesByParentId(_id.toString());
  }
}
