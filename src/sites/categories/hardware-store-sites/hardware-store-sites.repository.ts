import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepositorySite } from 'src/common/abstract/abstract.repository.site';
import { HardwareStoreSite, WearSite } from 'src/common/entities/site.model';
import { SiteDocument } from 'src/common/entities/site.schema';


@Injectable()
export class HardwareStoreSitesRepository extends AbstractRepositorySite<SiteDocument> {
  protected readonly logger = new Logger(HardwareStoreSitesRepository.name);
  constructor(
    @InjectModel(HardwareStoreSite.name, 'hardwareStoreDB')
    siteModel: Model<SiteDocument>,
  ) {
    super(siteModel);
  }
}
