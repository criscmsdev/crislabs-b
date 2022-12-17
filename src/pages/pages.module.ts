import { Module } from '@nestjs/common';
import { MarketingPagesModule } from './categories/marketing-pages/marketing-pages.module';
import { WearPagesModule } from './categories/wear-pages/wear-pages.module';

@Module({
  imports: [MarketingPagesModule, WearPagesModule],
})
export class PagesModule {}
