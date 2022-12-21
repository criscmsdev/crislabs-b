import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HardwareStoreSite } from 'src/common/entities/site.model';
import { HardwareStoreSiteSchema } from 'src/common/entities/site.schema';
import { HardwareStorePagesModule } from 'src/pages/categories/hardware-store-pages/hardware-store-pages.module';
import { HardwareStoreSitesRepository } from './hardware-store-sites.repository';

import { HardwareStoreSiteResolver } from './hardware-store-sites.resolver';
import { HardwareStoreSitesService } from './hardware-store-sites.service';

@Module({
  imports: [
    HardwareStorePagesModule,
    MongooseModule.forFeature(
      [{ name: HardwareStoreSite.name, schema: HardwareStoreSiteSchema }],
      'hardwareStoreDB',
    ),
  ],
  providers: [
    HardwareStoreSitesService,
    HardwareStoreSiteResolver,
    HardwareStoreSitesRepository,
  ],
  exports: [HardwareStoreSitesRepository],
})
export class HardwareStoreSitesModule {}
