import { Module } from '@nestjs/common';
import { MarketingSitesModule } from './categories/marketing-sites/marketing-sites.module';
import { FoodSitesModule } from './categories/food-sites/food-sites.module';
import { WearSitesModule } from './categories/wear-sites/wear-sites.module';
import { HardwareStoreSitesModule } from './categories/hardware-store-sites/hardware-store-sites.module';

@Module({
  imports: [
    MarketingSitesModule,
    FoodSitesModule,
    WearSitesModule,
    HardwareStoreSitesModule,
  ],
})
export class SitesModule {}
