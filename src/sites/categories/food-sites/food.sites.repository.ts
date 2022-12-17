import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepositorySite } from 'src/common/abstract/abstract.repository.site';
import { FoodSite } from 'src/common/entities/site.model';
import { SiteDocument } from 'src/common/entities/site.schema';

@Injectable()
export class FoodSitesRepository extends AbstractRepositorySite<SiteDocument> {
  protected readonly logger = new Logger(FoodSitesRepository.name);
  constructor(
    @InjectModel(FoodSite.name, 'foodDB') siteModel: Model<SiteDocument>,
  ) {
    super(siteModel);
  }
}

