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
import { WearPages2Service } from '../services/pages2.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { WearPages3Service } from '../services/pages3.service';

@Resolver(() => Page)
export class WearPages2Resolver {
  constructor(
    private readonly pages2Service: WearPages2Service,
    private readonly pages3Service: WearPages3Service,
  ) {}

  @Mutation(() => Page, { name: 'wearCreatePage2' })
  createPage(@Args('inputCreate') inputCreate: CreatePage) {
    return this.pages2Service.create(inputCreate);
  }
  @Mutation(() => Page, { name: 'wearUpdatePage2' })
  updatePage(
    @Args('inputUpdate') inputUpdate: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.pages2Service.update(inputUpdate);
  }

  @Mutation(() => Page, { name: 'wearUpdateImagePage2' })
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

  @Query(() => Page, { name: 'wearGetPage2' })
  findPage(@Args('id') id: string) {
    return this.pages2Service.findPage(id);
  }

  @Query(() => [Page], { name: 'wearGetPages2' })
  findPages() {
    return this.pages2Service.findPages();
  }

  @Query(() => [Page], { name: 'wearGetPages2ByParentId' })
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

  @ResolveField('pages', () => [Page], { nullable: 'itemsAndList' })
  getPage(@Parent() { _id }: Page) {
    return this.pages3Service.findPagesByParentId(_id.toString());
  }
}
