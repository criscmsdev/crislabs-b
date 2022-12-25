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
  HardwareStorePage0,
  HardwareStorePage1,
  ListPage,
  Page,
} from 'src/common/entities/page.model';
import { HardwareStorePages0Service } from '../services/pages0.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { HardwareStorePages1Service } from '../services/pages1.service';

@Resolver(() => HardwareStorePage0)
export class HardwareStorePages0Resolver {
  constructor(
    private readonly pages0Service: HardwareStorePages0Service,
    private readonly pages1Service: HardwareStorePages1Service,
  ) {}

  @Mutation(() => HardwareStorePage0, { name: 'hardwareStoreCreatePage0' })
  createPage(@Args('inputCreate') inputCreate: CreatePage) {
    return this.pages0Service.create(inputCreate);
  }
  @Mutation(() => HardwareStorePage0, { name: 'hardwareStoreUpdatePage0' })
  updatePage(
    @Args('inputUpdate') inputUpdate: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.pages0Service.update(inputUpdate);
  }

  @Mutation(() => HardwareStorePage0, { name: 'hardwareStoreUpdateImagePage0' })
  updateImage(@Args('inputImage') inputImage: UpdateImage) {
    return this.pages0Service.updateImage(inputImage);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeletePage0' })
  deletePage(@Args('id') id: string) {
    return this.pages0Service.deletePage(id);
  }

  @Mutation(() => [String], { name: 'hardwareStoreDeletePages0' })
  deletePagesById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    return this.pages0Service.deletePagesById(ids);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeleteAllPages0' })
  deleteAllPages() {
    return this.pages0Service.deleteAllPages();
  }

  @Query(() => HardwareStorePage0, { name: 'hardwareStoreGetPage0' })
  findPage(@Args('id') id: string) {
    return this.pages0Service.findPage(id);
  }
  @Query(() => HardwareStorePage0, { name: 'hardwareStoreGetPage0BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.pages0Service.findPageBySlug(slug, siteId);
  }

  @Query(() => [HardwareStorePage0], { name: 'hardwareStoreGetPages0' })
  findPages() {
    return this.pages0Service.findPages();
  }

  @Query(() => [HardwareStorePage0], {
    name: 'hardwareStoreGetPages0ByParentId',
  })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.pages0Service.findPagesByParentId(parentId);
  }

  @Query(() => ListPage, { name: 'hardwareStoreGetPages0WithCursor' })
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

  @ResolveField('pages', () => [HardwareStorePage1], {
    nullable: 'itemsAndList',
  })
  getPage1(@Parent() { _id }: HardwareStorePage0) {
    return this.pages1Service.findPagesByParentId(_id.toString());
  }
}
