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
  HardwareStorePage1,
  HardwareStorePage2,
  ListPage,
  Page,
} from 'src/common/entities/page.model';
import { HardwareStorePages1Service } from '../services/pages1.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { HardwareStorePages2Service } from '../services/pages2.service';

@Resolver(() => HardwareStorePage1)
export class HardwareStorePages1Resolver {
  constructor(
    private readonly pages1Service: HardwareStorePages1Service,
    private readonly pages2Service: HardwareStorePages2Service,
  ) {}

  @Mutation(() => HardwareStorePage1, { name: 'hardwareStoreCreatePage1' })
  createPage(@Args('inputCreate') inputCreate: CreatePage) {
    return this.pages1Service.create(inputCreate);
  }
  @Mutation(() => HardwareStorePage1, { name: 'hardwareStoreUpdatePage1' })
  updatePage(
    @Args('inputUpdate') inputUpdate: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.pages1Service.update(inputUpdate);
  }

  @Mutation(() => HardwareStorePage1, { name: 'hardwareStoreUpdateImagePage1' })
  updateImage(@Args('inputImage') inputImage: UpdateImage) {
    return this.pages1Service.updateImage(inputImage);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeletePage1' })
  deletePage(@Args('id') id: string) {
    return this.pages1Service.deletePage(id);
  }

  @Mutation(() => [String], { name: 'hardwareStoreDeletePages1' })
  deletePagesById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    return this.pages1Service.deletePagesById(ids);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeleteAllPages1' })
  deleteAllPages() {
    return this.pages1Service.deleteAllPages();
  }

  @Query(() => HardwareStorePage1, { name: 'hardwareStoreGetPage1' })
  findPage(@Args('id') id: string) {
    return this.pages1Service.findPage(id);
  }

  @Query(() => HardwareStorePage1, { name: 'hardwareStoreGetPage1BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.pages1Service.findPageBySlug(slug, siteId);
  }

  @Query(() => [HardwareStorePage1], { name: 'hardwareStoreGetPages1' })
  findPages() {
    return this.pages1Service.findPages();
  }

  @Query(() => [HardwareStorePage1], {
    name: 'hardwareStoreGetPages1ByParentId',
  })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.pages1Service.findPagesByParentId(parentId);
  }

  @Query(() => ListPage, { name: 'hardwareStoreGetPages1WithCursor' })
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

  @ResolveField('pages', () => [HardwareStorePage2], {
    nullable: 'itemsAndList',
  })
  getPage2(@Parent() { _id }: HardwareStorePage1) {
    return this.pages2Service.findPagesByParentId(_id.toString());
  }
}
