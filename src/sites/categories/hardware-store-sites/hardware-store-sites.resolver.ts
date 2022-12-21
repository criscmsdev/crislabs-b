import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  CreateSite,
  UpdateDB,
  UpdateImage,
  UpdateSite,
} from 'src/common/dto/site.input';
import {
  HardwareStoreSite,
  ListSite,
  Site,
} from 'src/common/entities/site.model';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { connectionFromArraySlice } from 'graphql-relay';

import { HardwareStoreSitesService } from './hardware-store-sites.service';
import { HardwareStorePage0, Page } from 'src/common/entities/page.model';
import { HardwareStorePages0Service } from 'src/pages/categories/hardware-store-pages/services';

@Resolver(() => HardwareStoreSite)
export class HardwareStoreSiteResolver {
  constructor(
    private readonly siteService: HardwareStoreSitesService,
    private readonly pageService: HardwareStorePages0Service,
  ) {}

  @Mutation(() => HardwareStoreSite, { name: 'hardwareStoreCreateSite' })
  async create(@Args('inputCreate') inputCreate: CreateSite) {
    const document = await this.siteService.create(inputCreate);
    this.pageService.create(this.page0(document._id, inputCreate.uid));
    return document;
  }

  @Mutation(() => HardwareStoreSite, { name: 'hardwareStoreUpdateSite' })
  update(@Args('inputUpdate') inputUpdate: UpdateSite) {
    return this.siteService.update(inputUpdate);
  }

  @Mutation(() => HardwareStoreSite, { name: 'hardwareStoreUpdateDbSite' })
  updateDB(@Args('inputDB') inputDB: UpdateDB) {
    return this.siteService.updateDB(inputDB);
  }

  @Mutation(() => HardwareStoreSite, { name: 'hardwareStoreUpdateImageSite' })
  updateImage(@Args('inputImage') inputImage: UpdateImage) {
    return this.siteService.updateImage(inputImage);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeleteSite' })
  delete(@Args('id') id: string) {
    this.pageService.deletePagesByParentId([id]);
    return this.siteService.deleteSite(id);
  }

  @Mutation(() => [String], { name: 'hardwareStoreDeleteSites' })
  deleteSites(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.pageService.deletePagesByParentId(ids);
    return this.siteService.deleteSitesById(ids);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeleteAllSites' })
  deleteAllSites() {
    return this.siteService.deleteAllSites();
  }

  @Query(() => HardwareStoreSite, { name: 'hardwareStoreGetSite' })
  getSite(@Args('id') id: string) {
    return this.siteService.getSite(id);
  }

  @Query(() => [HardwareStoreSite], { name: 'hardwareStoreGetSites' })
  getSites() {
    return this.siteService.getSites();
  }

  @Query(() => ListSite, { name: 'hardwareStoreGetSitesWithCursor' })
  async hardwareStoreGetSitesWithCursor(
    @Args('args') args: ConnectionArgs,
  ): Promise<ListSite> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.siteService.all({
      limit,
      offset,
    });
    const page = connectionFromArraySlice(data, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });
    return { page, pageData: { count, limit, offset } };
  }

  @ResolveField('pages', () => [HardwareStorePage0], {
    nullable: 'itemsAndList',
  })
  getPage0(@Parent() { _id }: HardwareStoreSite) {
    // _id.toString();
    return this.pageService.findPagesByParentId(_id.toString());
  }

  private page0(id: string, uid: string) {
    return {
      title: 'home',
      description: 'home description',
      type: 'page-blank',
      parentId: id,
      siteId: id,
      uid: uid,
    };
  }
}
