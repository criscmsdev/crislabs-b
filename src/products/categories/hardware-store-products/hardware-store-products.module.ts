import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ToolProduct } from 'src/common/entities/product.model';
import { ToolProductSchema } from 'src/common/entities/product.schema';
import { ToolProductsRepository } from './hardware-store-products.repository';
import { HardwareStoreProductsResolver } from './hardware-store-products.resolver';
import { HardwareStoreProductsService } from './hardware-store-products.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: ToolProduct.name, schema: ToolProductSchema }],
      'hardwareStoreDB',
    ),
  ],
  providers: [
    HardwareStoreProductsResolver,
    HardwareStoreProductsService,
    ToolProductsRepository,
  ],
  exports: [HardwareStoreProductsService],
})
export class HardwareStoreProductsModule {}
