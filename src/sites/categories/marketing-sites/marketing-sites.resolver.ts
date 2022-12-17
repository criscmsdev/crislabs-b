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

import { MarketingSitesService } from './marketing-sites.service';
import { MarketingPages0Service } from 'src/pages/categories/marketing-pages/services';
import { Page } from 'src/common/entities/page.model';

@Resolver(() => Site)
export class MarketingSiteResolver {
  constructor(
    private readonly siteService: MarketingSitesService,
    private readonly pageService: MarketingPages0Service,
  ) {}

  @Mutation(() => Site, { name: 'marketingCreateSite' })
  async create(@Args('inputCreate') inputCreate: CreateSite) {
    const document = await this.siteService.create(inputCreate);
    this.pageService.create(this.page0(document._id, inputCreate.uid));
    return document;
  }

  @Mutation(() => Site, { name: 'marketingUpdateSite' })
  update(@Args('inputUpdate') inputUpdate: UpdateSite) {
    return this.siteService.update(inputUpdate);
  }

  @Mutation(() => Site, { name: 'marketingUpdateDbSite' })
  updateDB(@Args('inputDB') inputDB: UpdateDB) {
    return this.siteService.updateDB(inputDB);
  }
  @Mutation(() => Site, { name: 'marketingUpdateImageSite' })
  updateImage(@Args('inputImage') inputImage: UpdateImage) {
    return this.siteService.updateImage(inputImage);
  }

  @Mutation(() => String, { name: 'marketingDeleteSite' })
  delete(@Args('id') id: string) {
    return this.siteService.deleteSite(id);
  }

  @Mutation(() => [String], { name: 'marketingDeleteSites' })
  deleteSites(@Args('ids', { type: () => [String] }) ids: string[]) {
    return this.siteService.deleteSitesById(ids);
  }
  @Mutation(() => String, { name: 'marketingDeleteAllSites' })
  deleteAllSites() {
    return this.siteService.deleteAllSites();
  }

  @Query(() => Site, { name: 'marketingGetSite' })
  getSite(@Args('id') id: string) {
    return this.siteService.getSite(id);
  }
  @Query(() => [Site], { name: 'marketingGetSites' })
  getSites() {
    return this.siteService.getSites();
  }
  @Query(() => ListSite, { name: 'marketingGetSitesWithCursor' })
  async marketingGetSitesWithCursor(
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
