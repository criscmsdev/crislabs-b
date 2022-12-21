import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepositoryProduct } from 'src/common/abstract/abstract.repository.product';
import { ToolProduct } from 'src/common/entities/product.model';
import { ProductDocument } from 'src/common/entities/product.schema';

@Injectable()
export class ToolProductsRepository extends AbstractRepositoryProduct<ProductDocument> {
  protected readonly logger = new Logger(ToolProductsRepository.name);
  constructor(
    @InjectModel(ToolProduct.name, 'hardwareStoreDB')
    productModel: Model<ProductDocument>,
  ) {
    super(productModel);
  }
}
