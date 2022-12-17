import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketingPage0, MarketingPage1 } from 'src/common/entities/page.model';
import { MarketingPage0Schema, MarketingPage1Schema } from 'src/common/entities/page.schema';
import {
  MarketingPages0Repository,
  MarketingPages1Repository,
} from './marketing-pages.repository';
import { MarketingPages0Service } from './services/pages0.service';
import { MarketingPages0Resolver } from './resolvers/pages0.resolver';
import { MarketingPages1Service } from './services/pages1.service';
import { MarketingPages1Resolver } from './resolvers/pages1.resolver';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: MarketingPage0.name, schema: MarketingPage0Schema },
        { name: MarketingPage1.name, schema: MarketingPage1Schema },
      ],
      'marketingDB',
    ),
  ],
  providers: [
    MarketingPages0Repository,
    MarketingPages0Service,
    MarketingPages0Resolver,
    MarketingPages1Repository,
    MarketingPages1Service,
    MarketingPages1Resolver,
  ],
  exports: [MarketingPages0Service],
})
export class MarketingPagesModule {}
