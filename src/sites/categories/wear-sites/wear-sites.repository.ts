import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepositorySite } from 'src/common/abstract/abstract.repository.site';
import { WearSite } from 'src/common/entities/site.model';
import { SiteDocument } from 'src/common/entities/site.schema';


@Injectable()
export class WearSitesRepository extends AbstractRepositorySite<SiteDocument> {
  protected readonly logger = new Logger(WearSitesRepository.name);
  constructor(
    @InjectModel(WearSite.name, 'wearDB')
    siteModel: Model<SiteDocument>,
  ) {
    super(siteModel);
  }
}
