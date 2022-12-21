// import { Injectable, Logger } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { AbstractRepositoryWearProduct } from 'src/common/abstract/products/abstract.repository.wear';
// import { ClothingProduct } from 'src/common/entities/products/wear.model';
// import { WearDocument } from 'src/common/entities/products/wear.schema';
// @Injectable()
// export class WearProductsRepository extends AbstractRepositoryWearProduct<WearDocument> {
//   protected readonly logger = new Logger(WearProductsRepository.name);
//   constructor(
//     @InjectModel(ClothingProduct.name, 'wearDB')
//     productModel: Model<WearDocument>,
//   ) {
//     super(productModel);
//   }
// }
