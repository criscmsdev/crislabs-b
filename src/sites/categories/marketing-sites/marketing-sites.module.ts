import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketingSite } from 'src/common/entities/site.model';
import { MarketingSiteSchema } from 'src/common/entities/site.schema';
import { MarketingPagesModule } from 'src/pages/categories/marketing-pages/marketing-pages.module';
import { MarketingSitesRepository } from './marketing-sites.repository';

import { MarketingSiteResolver } from './marketing-sites.resolver';
import { MarketingSitesService } from './marketing-sites.service';

@Module({
  imports: [
    MarketingPagesModule,
    MongooseModule.forFeature(
      [{ name: MarketingSite.name, schema: MarketingSiteSchema }],
      'marketingDB',
    ),
  ],
  providers: [
    MarketingSitesService,
    MarketingSiteResolver,
    MarketingSitesRepository,
  ],
})
export class MarketingSitesModule {}
