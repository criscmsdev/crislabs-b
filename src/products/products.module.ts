import { Module } from '@nestjs/common';
import { HardwareStoreProductsModule } from './categories/hardware-store-products/hardware-store-products.module';
// import { WearProductsModule } from './categories/wear-products/wear-products.module';

@Module({
  imports: [
    // WearProductsModule,
    HardwareStoreProductsModule,
  ],
})
export class ProductsModule {}
