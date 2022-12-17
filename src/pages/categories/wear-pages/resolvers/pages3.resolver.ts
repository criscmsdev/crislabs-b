import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { connectionFromArraySlice } from 'graphql-relay';
import { ListPage, Page } from 'src/common/entities/page.model';
import { WearPages3Service } from '../services/pages3.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';

@Resolver(() => Page)
export class WearPages3Resolver {
  constructor(private readonly pages3Service: WearPages3Service) {}

  @Mutation(() => Page, { name: 'wearCreatePage3' })
  createPage(@Args('inputCreate') inputCreate: CreatePage) {
    return this.pages3Service.create(inputCreate);
  }
  @Mutation(() => Page, { name: 'wearUpdatePage3' })
  updatePage(
    @Args('inputUpdate') inputUpdate: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.pages3Service.update(inputUpdate);
  }

  @Mutation(() => Page, { name: 'wearUpdateImagePage3' })
  updateImage(@Args('inputImage') inputImage: UpdateImage) {
    return this.pages3Service.updateImage(inputImage);
  }

  @Mutation(() => String, { name: 'wearDeletePage3' })
  deletePage(@Args('id') id: string) {
    return this.pages3Service.deletePage(id);
  }

  @Mutation(() => [String], { name: 'wearDeletePages3' })
  deletePagesById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    return this.pages3Service.deletePagesById(ids);
  }

  @Mutation(() => String, { name: 'wearDeleteAllPages3' })
  deleteAllPages() {
    return this.pages3Service.deleteAllPages();
  }

  @Query(() => Page, { name: 'wearGetPage3' })
  findPage(@Args('id') id: string) {
    return this.pages3Service.findPage(id);
  }

  @Query(() => [Page], { name: 'wearGetPages3' })
  findPages() {
    return this.pages3Service.findPages();
  }

  @Query(() => [Page], { name: 'wearGetPages3ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.pages3Service.findPagesByParentId(parentId);
  }

  @Query(() => ListPage, { name: 'wearGetPages3WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ): Promise<ListPage> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.pages3Service.all(
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

  // @ResolveField('page', () => [Page3Wear], { nullable: 'itemsAndList' })
  // getPage(@Parent() { _id }: Page0Wear) {
  //   return this.pages1Service.findPagesByParentId(_id.toString());
  // }
}
