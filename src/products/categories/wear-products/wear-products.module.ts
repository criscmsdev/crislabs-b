// import { Module } from '@nestjs/common';
// import { WearProductsService } from './wear-products.service';
// import { WearProductsResolver } from './wear-products.resolver';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ClothingProduct } from 'src/common/entities/products/wear.model';
// import { ClothingProductSchema } from 'src/common/entities/products/wear.schema';
// import { WearProductsRepository } from './wear.products.repository';

// @Module({
//   imports: [
//     MongooseModule.forFeature(
//       [{ name: ClothingProduct.name, schema: ClothingProductSchema }],
//       'wearDB',
//     ),
//   ],
//   providers: [
//     WearProductsResolver,
//     WearProductsService,
//     WearProductsRepository,
//   ],
//   exports: [WearProductsService],
// })
// export class WearProductsModule {}
