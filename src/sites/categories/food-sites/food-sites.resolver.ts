import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateSite,
  UpdateDB,
  UpdateImage,
  UpdateSite,
} from 'src/common/dto/site.input';
import { FoodSite, ListSite, Site } from 'src/common/entities/site.model';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { connectionFromArraySlice } from 'graphql-relay';

import { FoodSitesService } from './food-sites.service';

@Resolver(() => FoodSite)
export class FoodSiteResolver {
  constructor(private readonly siteService: FoodSitesService) {}

  @Mutation(() => FoodSite, { name: 'foodCreateSite' })
  create(@Args('inputCreate') inputCreate: CreateSite) {
    return this.siteService.create(inputCreate);
  }

  @Mutation(() => FoodSite, { name: 'foodUpdateSite' })
  update(@Args('inputUpdate') inputUpdate: UpdateSite) {
    return this.siteService.update(inputUpdate);
  }

  @Mutation(() => FoodSite, { name: 'foodUpdateDbSite' })
  updateDB(@Args('inputDB') inputDB: UpdateDB) {
    return this.siteService.updateDB(inputDB);
  }
  @Mutation(() => FoodSite, { name: 'foodUpdateImageSite' })
  updateImage(@Args('inputImage') inputImage: UpdateImage) {
    return this.siteService.updateImage(inputImage);
  }

  @Mutation(() => String, { name: 'foodDeleteSite' })
  delete(@Args('id') id: string) {
    return this.siteService.deleteSite(id);
  }

  @Mutation(() => [String], { name: 'foodDeleteSites' })
  deleteSites(@Args('ids', { type: () => [String] }) ids: string[]) {
    return this.siteService.deleteSitesById(ids);
  }
  @Mutation(() => String, { name: 'foodDeleteAllSites' })
  deleteAllSites() {
    return this.siteService.deleteAllSites();
  }

  @Query(() => FoodSite, { name: 'foodGetSite' })
  getSite(@Args('id') id: string) {
    return this.siteService.getSite(id);
  }
  @Query(() => [FoodSite], { name: 'foodGetSites' })
  getSites() {
    return this.siteService.getSites();
  }
  @Query(() => ListSite, { name: 'foodGetSitesWithCursor' })
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
}
