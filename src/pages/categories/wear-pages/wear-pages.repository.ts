import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepositoryPage } from 'src/common/abstract/abstract.repository.page';
import {
  WearPage0,
  WearPage1,
  WearPage2,
  WearPage3,
} from 'src/common/entities/page.model';
import { PageDocument } from 'src/common/entities/page.schema';

@Injectable()
export class WearPages0Repository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(WearPages0Repository.name);
  constructor(
    @InjectModel(WearPage0.name, 'wearDB')
    pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}

@Injectable()
export class WearPages1Repository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(WearPages1Repository.name);
  constructor(
    @InjectModel(WearPage1.name, 'wearDB')
    pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}

@Injectable()
export class WearPages2Repository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(WearPages2Repository.name);
  constructor(
    @InjectModel(WearPage2.name, 'wearDB')
    pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}

@Injectable()
export class WearPages3Repository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(WearPages3Repository.name);
  constructor(
    @InjectModel(WearPage3.name, 'wearDB')
    pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
