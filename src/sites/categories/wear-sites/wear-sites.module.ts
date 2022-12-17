import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WearSite } from 'src/common/entities/site.model';
import { WearSiteSchema } from 'src/common/entities/site.schema';
import { WearPagesModule } from 'src/pages/categories/wear-pages/wear-pages.module';
// import { WearPagesModule } from 'src/pages/categories/marketing-pages/marketing-pages.module';
import { WearSitesRepository } from './wear-sites.repository';

import { WearSiteResolver } from './wear-sites.resolver';
import { WearSitesService } from './wear-sites.service';

@Module({
  imports: [
    WearPagesModule,
    MongooseModule.forFeature(
      [{ name: WearSite.name, schema: WearSiteSchema }],
      'wearDB',
    ),
  ],
  providers: [WearSitesService, WearSiteResolver, WearSitesRepository],
  exports: [WearSitesRepository]
})
export class WearSitesModule {}
