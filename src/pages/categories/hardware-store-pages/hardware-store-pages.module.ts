import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  HardwareStorePage0,
  HardwareStorePage1,
  HardwareStorePage2,
  HardwareStorePage3,
} from 'src/common/entities/page.model';
import {
  HardwareStorePage0Schema,
  HardwareStorePage1Schema,
  HardwareStorePage2Schema,
  HardwareStorePage3Schema,
} from 'src/common/entities/page.schema';
import {
  HardwareStorePages0Repository,
  HardwareStorePages1Repository,
  HardwareStorePages2Repository,
  HardwareStorePages3Repository,
} from './hardware-store-pages.repository';
import { HardwareStorePages0Service } from './services/pages0.service';
import { HardwareStorePages0Resolver } from './resolvers/pages0.resolver';
import { HardwareStorePages1Service } from './services/pages1.service';
import { HardwareStorePages1Resolver } from './resolvers/pages1.resolver';
import { HardwareStorePages2Service } from './services/pages2.service';
import { HardwareStorePages2Resolver } from './resolvers/pages2.resolver';
import { HardwareStorePages3Service } from './services/pages3.service';
import { HardwareStorePages3Resolver } from './resolvers/pages3.resolver';
import { HardwareStoreProductsModule } from 'src/products/categories/hardware-store-products/hardware-store-products.module';

@Module({
  imports: [
    HardwareStoreProductsModule,
    MongooseModule.forFeature(
      [
        { name: HardwareStorePage0.name, schema: HardwareStorePage0Schema },
        { name: HardwareStorePage1.name, schema: HardwareStorePage1Schema },
        { name: HardwareStorePage2.name, schema: HardwareStorePage2Schema },
        { name: HardwareStorePage3.name, schema: HardwareStorePage3Schema },
      ],
      'hardwareStoreDB',
    ),
  ],
  providers: [
    HardwareStorePages0Repository,
    HardwareStorePages0Service,
    HardwareStorePages0Resolver,
    HardwareStorePages1Repository,
    HardwareStorePages1Service,
    HardwareStorePages1Resolver,
    HardwareStorePages2Repository,
    HardwareStorePages2Service,
    HardwareStorePages2Resolver,
    HardwareStorePages3Repository,
    HardwareStorePages3Service,
    HardwareStorePages3Resolver,
  ],
  exports: [
    HardwareStorePages0Service,
    HardwareStorePages0Repository,
    HardwareStorePages1Service,
    HardwareStorePages1Repository,
  ],
})
export class HardwareStorePagesModule {}
