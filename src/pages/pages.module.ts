import { Module } from '@nestjs/common';
import { HardwareStorePagesModule } from './categories/hardware-store-pages/hardware-store-pages.module';
import { MarketingPagesModule } from './categories/marketing-pages/marketing-pages.module';
import { WearPagesModule } from './categories/wear-pages/wear-pages.module';

@Module({
  imports: [MarketingPagesModule, WearPagesModule, HardwareStorePagesModule],
})
export class PagesModule {}
