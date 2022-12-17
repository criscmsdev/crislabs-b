import { Module } from '@nestjs/common';
import { MarketingArticlesModule } from './categories/marketing-articles/marketing-articles.module';

@Module({
  imports: [MarketingArticlesModule],
})
export class ArticlesModule {}
