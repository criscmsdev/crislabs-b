import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepositoryArticle } from 'src/common/abstract/abstract.repository.article';
import { MarketingArticle } from 'src/common/entities/article.model';
import { ArticleDocument } from 'src/common/entities/article.schema';

@Injectable()
export class MarketingArticlesRepository extends AbstractRepositoryArticle<ArticleDocument> {
  protected readonly logger = new Logger(MarketingArticlesRepository.name);
  constructor(
    @InjectModel(MarketingArticle.name, 'marketingDB')
    pageModel: Model<ArticleDocument>,
  ) {
    super(pageModel);
  }
}
