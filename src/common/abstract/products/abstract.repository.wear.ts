// import {
//   Logger,
//   NotFoundException,
//   UnprocessableEntityException,
// } from '@nestjs/common';
// import { FilterQuery, Model, Types } from 'mongoose';
// import {
//   CreateWearProduct,
//   UpdateWearProduct,
// } from 'src/common/dto/product/wear.input';
// import { UpdateImage, UpdateImageProduct } from 'src/common/dto/site.input';
// import { ListInput } from 'src/common/pagination/dto/list.input';
// import { capitalizar, slug, uuidv3 } from 'utils/function';
// import { AbstractDocument } from '../abstract.schema';

// export abstract class AbstractRepositoryWearProduct<
//   TDocument extends AbstractDocument,
// > {
//   protected abstract readonly logger: Logger;

//   constructor(protected readonly model: Model<TDocument>) {}

//   async create(input: CreateWearProduct): Promise<TDocument> {
//     const document = await this.model.findOne(
//       {
//         slug: slug(input.name),
//         siteId: input.siteId,
//         parentId: input.parentId,
//       },
//       {},
//       { lean: true },
//     );

//     if (document) {
//       // this.logger.warn('Document not found with filterQuery', filterQuery);
//       throw new UnprocessableEntityException(
//         `You already have an item registered with that name "${input.name}"`,
//       );
//     }
//     const createdDocument = new this.model(this.wearCreated(input));
//     return (await createdDocument.save()).toJSON() as unknown as TDocument;
//   }

//   async update(
//     input: UpdateWearProduct,
//     options: Record<string, unknown> = { lean: true, new: true },
//   ) {
//     const data = await this.model.findOne(
//       {
//         _id: { $ne: input.id },
//         slug: slug(input.name),
//         siteId: input.siteId,
//         parentId: input.parentId,
//       },
//       {},
//       { lean: true },
//     );
//     if (data) {
//       // this.logger.warn('Document not found with filterQuery', filterQuery);
//       throw new UnprocessableEntityException(
//         `You already have an item registered with that name "${input.name}"`,
//       );
//     }
//     const document = await this.model.findOneAndUpdate(
//       { _id: input.id },
//       this.productUpdate(input),
//       options,
//     );
//     if (!document) {
//       // this.logger.warn(`Document not found with filterQuery:`, filterQuery);
//       throw new NotFoundException('Document not found.');
//     }
//     return document;
//   }

//   // async updateContent(
//   //   input: UpdateArticle,
//   //   options: Record<string, unknown> = { lean: true, new: true },
//   // )

//   async updateImage(
//     input: UpdateImageProduct,
//     options: Record<string, unknown> = { lean: true, new: true },
//   ) {
//     const document = await this.model.findOneAndUpdate(
//       { _id: input.id },
//       this.productImage(input),
//       options,
//     );
//     if (!document) {
//       // this.logger.warn(`Document not found with filterQuery:`, filterQuery);
//       throw new NotFoundException('Document not found.');
//     }
//     return document;
//   }

//   async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
//     const document = await this.model.findOne(filterQuery, {}, { lean: true });

//     if (!document) {
//       this.logger.warn('Document not found with filterQuery', filterQuery);
//       throw new NotFoundException('Document not found.');
//     }
//     return document;
//   }

//   // async updateMany(
//   //   filterQuery: FilterQuery<TDocument>,
//   //   update: UpdateQuery<TDocument>,
//   // ) {
//   //   const document = await this.model.updateMany(
//   //     { siteId: filterQuery.siteId },
//   //     { $set: update },
//   //   );
//   //   return document;
//   // }

//   async find(filterQuery: FilterQuery<TDocument>) {
//     return this.model.find(filterQuery, {}, { lean: true });
//   }

//   async deleteOne(filterQuery: FilterQuery<TDocument>) {
//     return this.model.deleteOne(filterQuery);
//   }

//   async deleteMany(filterQuery: FilterQuery<TDocument>) {
//     return this.model.deleteMany(filterQuery);
//   }

//   findAll(paginationQuery: ListInput, filterQuery: FilterQuery<TDocument>) {
//     const { limit, offset } = paginationQuery;
//     return this.model
//       .find(filterQuery, {}, { lean: true })
//       .sort({ 'dataWear.updateDate.lastUpdatedAt': -1 })
//       .skip(offset)
//       .limit(limit)
//       .exec();
//   }

//   async All(paginationQuery: ListInput, filterQuery: FilterQuery<TDocument>) {
//     const count = await this.model.count(filterQuery);
//     const data = await this.findAll(paginationQuery, filterQuery);
//     return { data, count };
//   }

//   private wearCreated({
//     name,
//     mark,
//     promotion,
//     inStock,
//     price,
//     discountPrice,
//     description,
//     siteId,
//     parentId,
//     uid,
//     type,
//   }: CreateWearProduct) {
//     return {
//       _id: new Types.ObjectId(),
//       siteId: siteId,
//       parentId: parentId,
//       slug: slug(name),
//       dataWear: {
//         mark: {
//           label: mark,
//           slug: slug(mark),
//         },
//         promotion: {
//           label: promotion,
//           slug: slug(promotion),
//         },
//         type: {
//           label: type,
//           slug: slug(type),
//         },
//         inStock: inStock,
//         price: price,
//         discountPrice: discountPrice,
//         seoWear: {
//           title: capitalizar(name),
//           href: slug(name),
//           description: description,
//         },
//         updateDate: {
//           createdAt: new Date(),
//           lastUpdatedAt: new Date(),
//           register: [
//             {
//               uid: uid,
//               change: 'create product',
//               updatedAt: new Date(),
//             },
//           ],
//         },
//       },
//     };
//   }
//   private productUpdate({
//     name,
//     mark,
//     promotion,
//     inStock,
//     price,
//     discountPrice,
//     description,
//     siteId,
//     parentId,
//     uid,
//     type,
//     tags,
//   }: UpdateWearProduct) {
//     return {
//       $set: {
//         'dataWear.mark': {
//           label: mark,
//           slug: slug(mark),
//         },
//         'dataWear.promotion': {
//           label: promotion,
//           slug: slug(promotion),
//         },
//         'dataWear.inStock': inStock,
//         'dataWear.price': price,
//         'dataWear.discountPrice': discountPrice,
//         'dataWear.tags': tags.map((data) => ({
//           uid: uuidv3(),
//           text: data,
//           slug: slug(data),
//         })),
//         'dataWear.seoWear.title': capitalizar(name),
//         'dataWear.seoWear.href': slug(name),
//         'dataWear.seoWear.description': description,
//         'dataWear.updateDate.lastUpdatedAt': new Date(),
//         slug: slug(name),
//       },
//       $push: {
//         'dataWear.updateDate.register': {
//           uid: uid,
//           change: 'product update',
//           updatedAt: new Date(),
//         },
//       },
//     };
//   }

//   private productImage({ images, type, uid }: UpdateImageProduct) {
//     return {
//       $set: {
//         'dataWear.imageProduct': images.map((data) => ({
//           uid: uuidv3(),
//           src: data.src,
//           alt: data.alt,
//         })),
//         'dataWear.seoWear.image.src': images[0].src,
//         'dataWear.seoWear.image.alt': images[0].alt,
//         'dataWear.updateDate.lastUpdatedAt': new Date(),
//       },
//       $push: {
//         'dataWear.updateDate.register': {
//           uid: uid,
//           change: 'image product update',
//           updatedAt: new Date(),
//         },
//       },
//     };
//   }
// }
