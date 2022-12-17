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
import { WearPages1Service } from '../services/pages1.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { WearPages2Service } from '../services/pages2.service';

@Resolver(() => Page)
export class WearPages1Resolver {
  constructor(
    private readonly pages1Service: WearPages1Service,
    private readonly pages2Service: WearPages2Service,
  ) {}

  @Mutation(() => Page, { name: 'wearCreatePage1' })
  createPage(@Args('inputCreate') inputCreate: CreatePage) {
    return this.pages1Service.create(inputCreate);
  }
  @Mutation(() => Page, { name: 'wearUpdatePage1' })
  updatePage(
    @Args('inputUpdate') inputUpdate: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.pages1Service.update(inputUpdate);
  }

  @Mutation(() => Page, { name: 'wearUpdateImagePage1' })
  updateImage(@Args('inputImage') inputImage: UpdateImage) {
    return this.pages1Service.updateImage(inputImage);
  }

  @Mutation(() => String, { name: 'wearDeletePage1' })
  deletePage(@Args('id') id: string) {
    return this.pages1Service.deletePage(id);
  }

  @Mutation(() => [String], { name: 'wearDeletePages1' })
  deletePagesById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    return this.pages1Service.deletePagesById(ids);
  }

  @Mutation(() => String, { name: 'wearDeleteAllPages1' })
  deleteAllPages() {
    return this.pages1Service.deleteAllPages();
  }

  @Query(() => Page, { name: 'wearGetPage1' })
  findPage(@Args('id') id: string) {
    return this.pages1Service.findPage(id);
  }

  @Query(() => [Page], { name: 'wearGetPages1' })
  findPages() {
    return this.pages1Service.findPages();
  }

  @Query(() => [Page], { name: 'wearGetPages1ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.pages1Service.findPagesByParentId(parentId);
  }

  @Query(() => ListPage, { name: 'wearGetPages1WithCursor' })
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

  @ResolveField('pages', () => [Page], { nullable: 'itemsAndList' })
  getPage(@Parent() { _id }: Page) {
    return this.pages2Service.findPagesByParentId(_id.toString());
  }
}
