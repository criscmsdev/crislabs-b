import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  WearPage0,
  WearPage1,
  WearPage2,
  WearPage3,
} from 'src/common/entities/page.model';
import {
  WearPage0Schema,
  WearPage1Schema,
  WearPage2Schema,
  WearPage3Schema,
} from 'src/common/entities/page.schema';
import {
  WearPages0Repository,
  WearPages1Repository,
  WearPages2Repository,
  WearPages3Repository,
} from './wear-pages.repository';
import { WearPages0Service } from './services/pages0.service';
import { WearPages0Resolver } from './resolvers/pages0.resolver';
import { WearPages1Service } from './services/pages1.service';
import { WearPages1Resolver } from './resolvers/pages1.resolver';
import { WearPages2Service } from './services/pages2.service';
import { WearPages2Resolver } from './resolvers/pages2.resolver';
import { WearPages3Service } from './services/pages3.service';
import { WearPages3Resolver } from './resolvers/pages3.resolver';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: WearPage0.name, schema: WearPage0Schema },
        { name: WearPage1.name, schema: WearPage1Schema },
        { name: WearPage2.name, schema: WearPage2Schema },
        { name: WearPage3.name, schema: WearPage3Schema },
      ],
      'wearDB',
    ),
  ],
  providers: [
    WearPages0Repository,
    WearPages0Service,
    WearPages0Resolver,
    WearPages1Repository,
    WearPages1Service,
    WearPages1Resolver,
    WearPages2Repository,
    WearPages2Service,
    WearPages2Resolver,
    WearPages3Repository,
    WearPages3Service,
    WearPages3Resolver,
  ],
  exports: [WearPages0Service, WearPages0Repository],
})
export class WearPagesModule {}
