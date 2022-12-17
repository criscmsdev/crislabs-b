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
import { ListSite, Site } from 'src/common/entities/site.model';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { connectionFromArraySlice } from 'graphql-relay';

import { WearSitesService } from './wear-sites.service';
import { WearPages0Service } from 'src/pages/categories/wear-pages/services';
import { Page } from 'src/common/entities/page.model';

@Resolver(() => Site)
export class WearSiteResolver {
  constructor(
    private readonly siteService: WearSitesService, 
    private readonly pageService: WearPages0Service,
  ) {}

  @Mutation(() => Site, { name: 'wearCreateSite' })
  async create(@Args('inputCreate') inputCreate: CreateSite) {
    const document = await this.siteService.create(inputCreate);
    this.pageService.create(this.page0(document._id, inputCreate.uid));
    return document;
  }

  @Mutation(() => Site, { name: 'wearUpdateSite' })
  update(@Args('inputUpdate') inputUpdate: UpdateSite) {
    return this.siteService.update(inputUpdate);
  }

  @Mutation(() => Site, { name: 'wearUpdateDbSite' })
  updateDB(@Args('inputDB') inputDB: UpdateDB) {
    return this.siteService.updateDB(inputDB);
  }

  @Mutation(() => Site, { name: 'wearUpdateImageSite' })
  updateImage(@Args('inputImage') inputImage: UpdateImage) {
    return this.siteService.updateImage(inputImage);
  }

  @Mutation(() => String, { name: 'wearDeleteSite' })
  delete(@Args('id') id: string) {
    this.pageService.deletePagesByParentId([id])
    return this.siteService.deleteSite(id);
  }

  @Mutation(() => [String], { name: 'wearDeleteSites' })
  deleteSites(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.pageService.deletePagesByParentId(ids)
    return this.siteService.deleteSitesById(ids);
  }

  @Mutation(() => String, { name: 'wearDeleteAllSites' })
  deleteAllSites() {
    return this.siteService.deleteAllSites();
  }

  @Query(() => Site, { name: 'wearGetSite' })
  getSite(@Args('id') id: string) {
    return this.siteService.getSite(id);
  }

  @Query(() => [Site], { name: 'wearGetSites' })
  getSites() {
    return this.siteService.getSites();
  }

  @Query(() => ListSite, { name: 'wearGetSitesWithCursor' })
  async wearGetSitesWithCursor(
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

  @ResolveField('pages', () => [Page], { nullable: 'itemsAndList' })
  getPage0(@Parent() { _id }: Site) {
    _id.toString();
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
