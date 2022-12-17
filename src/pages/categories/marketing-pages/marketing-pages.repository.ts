import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepositoryPage } from 'src/common/abstract/abstract.repository.page';
import { MarketingPage0, MarketingPage1 } from 'src/common/entities/page.model';
import { PageDocument } from 'src/common/entities/page.schema';

@Injectable()
export class MarketingPages0Repository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(MarketingPages0Repository.name);
  constructor(
    @InjectModel(MarketingPage0.name, 'marketingDB')
    pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class MarketingPages1Repository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(MarketingPages1Repository.name);
  constructor(
    @InjectModel(MarketingPage1.name, 'marketingDB')
    pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
