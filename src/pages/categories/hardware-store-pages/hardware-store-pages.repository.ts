import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepositoryPage } from 'src/common/abstract/abstract.repository.page';
import {
  HardwareStorePage0,
  HardwareStorePage1,
  HardwareStorePage2,
  HardwareStorePage3,
} from 'src/common/entities/page.model';
import { PageDocument } from 'src/common/entities/page.schema';

@Injectable()
export class HardwareStorePages0Repository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(HardwareStorePages0Repository.name);
  constructor(
    @InjectModel(HardwareStorePage0.name, 'hardwareStoreDB')
    pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}

@Injectable()
export class HardwareStorePages1Repository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(HardwareStorePages1Repository.name);
  constructor(
    @InjectModel(HardwareStorePage1.name, 'hardwareStoreDB')
    pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}

@Injectable()
export class HardwareStorePages2Repository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(HardwareStorePages2Repository.name);
  constructor(
    @InjectModel(HardwareStorePage2.name, 'hardwareStoreDB')
    pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}

@Injectable()
export class HardwareStorePages3Repository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(HardwareStorePages3Repository.name);
  constructor(
    @InjectModel(HardwareStorePage3.name, 'hardwareStoreDB')
    pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
