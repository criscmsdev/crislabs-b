import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepositorySite } from 'src/common/abstract/abstract.repository.site';
import { MarketingSite } from 'src/common/entities/site.model';
import { SiteDocument } from 'src/common/entities/site.schema';


@Injectable()
export class MarketingSitesRepository extends AbstractRepositorySite<SiteDocument> {
  protected readonly logger = new Logger(MarketingSitesRepository.name);
  constructor(
    @InjectModel(MarketingSite.name, 'marketingDB')
    siteModel: Model<SiteDocument>,
  ) {
    super(siteModel);
  }
}
