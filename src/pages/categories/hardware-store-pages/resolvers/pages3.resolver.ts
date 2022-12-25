import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { connectionFromArraySlice } from 'graphql-relay';
import {
  HardwareStorePage3,
  ListPage,
  Page,
} from 'src/common/entities/page.model';
import { HardwareStorePages3Service } from '../services/pages3.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';

@Resolver(() => HardwareStorePage3)
export class HardwareStorePages3Resolver {
  constructor(private readonly pages3Service: HardwareStorePages3Service) {}

  @Mutation(() => HardwareStorePage3, { name: 'hardwareStoreCreatePage3' })
  createPage(@Args('inputCreate') inputCreate: CreatePage) {
    return this.pages3Service.create(inputCreate);
  }
  @Mutation(() => HardwareStorePage3, { name: 'hardwareStoreUpdatePage3' })
  updatePage(
    @Args('inputUpdate') inputUpdate: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.pages3Service.update(inputUpdate);
  }

  @Mutation(() => HardwareStorePage3, { name: 'hardwareStoreUpdateImagePage3' })
  updateImage(@Args('inputImage') inputImage: UpdateImage) {
    return this.pages3Service.updateImage(inputImage);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeletePage3' })
  deletePage(@Args('id') id: string) {
    return this.pages3Service.deletePage(id);
  }

  @Mutation(() => [String], { name: 'hardwareStoreDeletePages3' })
  deletePagesById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    return this.pages3Service.deletePagesById(ids);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeleteAllPages3' })
  deleteAllPages() {
    return this.pages3Service.deleteAllPages();
  }

  @Query(() => HardwareStorePage3, { name: 'hardwareStoreGetPage3' })
  findPage(@Args('id') id: string) {
    return this.pages3Service.findPage(id);
  }

  @Query(() => HardwareStorePage3, { name: 'hardwareStoreGetPage3BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.pages3Service.findPageBySlug(slug, siteId);
  }

  @Query(() => [HardwareStorePage3], { name: 'hardwareStoreGetPages3' })
  findPages() {
    return this.pages3Service.findPages();
  }

  @Query(() => [HardwareStorePage3], {
    name: 'hardwareStoreGetPages3ByParentId',
  })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.pages3Service.findPagesByParentId(parentId);
  }

  @Query(() => ListPage, { name: 'hardwareStoreGetPages3WithCursor' })
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

  // @ResolveField('page', () => [Page3HardwareStore], { nullable: 'itemsAndList' })
  // getPage(@Parent() { _id }: Page0HardwareStore) {
  //   return this.pages1Service.findPagesByParentId(_id.toString());
  // }
}
