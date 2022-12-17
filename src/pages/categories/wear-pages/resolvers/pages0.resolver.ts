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
import { ListPage, Page } from 'src/common/entities/page.model';
import { WearPages0Service } from '../services/pages0.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { WearPages1Service } from '../services/pages1.service';

@Resolver(() => Page)
export class WearPages0Resolver {
  constructor(
    private readonly pages0Service: WearPages0Service,
    private readonly pages1Service: WearPages1Service,
  ) {}

  @Mutation(() => Page, { name: 'wearCreatePage0' })
  createPage(@Args('inputCreate') inputCreate: CreatePage) {
    return this.pages0Service.create(inputCreate);
  }
  @Mutation(() => Page, { name: 'wearUpdatePage0' })
  updatePage(
    @Args('inputUpdate') inputUpdate: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.pages0Service.update(inputUpdate);
  }

  @Mutation(() => Page, { name: 'wearUpdateImagePage0' })
  updateImage(@Args('inputImage') inputImage: UpdateImage) {
    return this.pages0Service.updateImage(inputImage);
  }

  @Mutation(() => String, { name: 'wearDeletePage0' })
  deletePage(@Args('id') id: string) {
    return this.pages0Service.deletePage(id);
  }

  @Mutation(() => [String], { name: 'wearDeletePages0' })
  deletePagesById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    return this.pages0Service.deletePagesById(ids);
  }

  @Mutation(() => String, { name: 'wearDeleteAllPages0' })
  deleteAllPages() {
    return this.pages0Service.deleteAllPages();
  }

  @Query(() => Page, { name: 'wearGetPage0' })
  findPage(@Args('id') id: string) {
    return this.pages0Service.findPage(id);
  }

  @Query(() => [Page], { name: 'wearGetPages0' })
  findPages() {
    return this.pages0Service.findPages();
  }

  @Query(() => [Page], { name: 'wearGetPages0ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.pages0Service.findPagesByParentId(parentId);
  }

  @Query(() => ListPage, { name: 'wearGetPages0WithCursor' })
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

  @ResolveField('pages', () => [Page], { nullable: 'itemsAndList' })
  getPage(@Parent() { _id }: Page) {
    return this.pages1Service.findPagesByParentId(_id.toString());
  }
}
