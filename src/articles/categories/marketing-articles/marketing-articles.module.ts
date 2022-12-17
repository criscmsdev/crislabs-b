import { Module } from '@nestjs/common';
import { MarketingArticlesService } from './marketing-articles.service';
import { MarketingArticlesResolver } from './marketing-articles.resolver';
import { MarketingArticlesRepository } from './marketing-articles.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketingArticle } from 'src/common/entities/article.model';
import { MarketingArticleSchema } from 'src/common/entities/article.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: MarketingArticle.name, schema: MarketingArticleSchema }],
      'marketingDB',
    ),
  ],
  providers: [
    MarketingArticlesResolver,
    MarketingArticlesService,
    MarketingArticlesRepository,
  ],
})
export class MarketingArticlesModule {}
