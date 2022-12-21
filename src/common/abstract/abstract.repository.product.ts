import {
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FilterQuery, Model, Types } from 'mongoose';
import {
  CreateWearProduct,
  UpdateWearProduct,
} from 'src/common/dto/product/wear.input';
import { UpdateImage, UpdateImageProduct } from 'src/common/dto/site.input';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { capitalizar, slug, uuidv3 } from 'utils/function';
import {
  CreateProduct,
  UpdateDetailsProduct,
  UpdateProduct,
  UpdateSpecsProduct,
} from '../dto/product.input';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepositoryProduct<
  TDocument extends AbstractDocument,
> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(input: CreateProduct): Promise<TDocument> {
    const document = await this.model.findOne(
      {
        slug: slug(input.name),
        siteId: input.siteId,
        parentId: input.parentId,
      },
      {},
      { lean: true },
    );

    if (document) {
      // this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new UnprocessableEntityException(
        `You already have an item registered with that name "${input.name}"`,
      );
    }
    const createdDocument = new this.model(this.productCreated(input));
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async update(
    input: UpdateProduct,
    options: Record<string, unknown> = { lean: true, new: true },
  ) {
    const data = await this.model.findOne(
      {
        _id: { $ne: input.id },
        slug: slug(input.name),
        siteId: input.siteId,
        parentId: input.parentId,
      },
      {},
      { lean: true },
    );
    if (data) {
      // this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new UnprocessableEntityException(
        `You already have an item registered with that name "${input.name}"`,
      );
    }
    const document = await this.model.findOneAndUpdate(
      { _id: input.id },
      this.productUpdate(input),
      options,
    );
    if (!document) {
      // this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }
  async updateSpecs(
    input: UpdateSpecsProduct,
    options: Record<string, unknown> = { lean: true, new: true },
  ) {
    //
    const document = await this.model.findOneAndUpdate(
      { _id: input.id },
      {
        $set: {
          'dataProduct.specs': input.specs,
        },
        $push: {
          'dataProduct.updateDate.register': {
            uid: input.uid,
            change: 'specs update',
            updatedAt: new Date(),
          },
        },
      },
      options,
    );
    if (!document) {
      // this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }
  async updateDetails(
    input: UpdateDetailsProduct,
    options: Record<string, unknown> = { lean: true, new: true },
  ) {
    //
    const document = await this.model.findOneAndUpdate(
      { _id: input.id },
      {
        $set: {
          'dataProduct.details': input.text,
        },
        $push: {
          'dataProduct.updateDate.register': {
            uid: input.uid,
            change: 'details update',
            updatedAt: new Date(),
          },
        },
      },
      options,
    );
    if (!document) {
      // this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }

  // async updateContent(
  //   input: UpdateArticle,
  //   options: Record<string, unknown> = { lean: true, new: true },
  // )

  async updateImage(
    input: UpdateImageProduct,
    options: Record<string, unknown> = { lean: true, new: true },
  ) {
    const document = await this.model.findOneAndUpdate(
      { _id: input.id },
      this.productImage(input),
      options,
    );
    if (!document) {
      // this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }

  // async updateMany(
  //   filterQuery: FilterQuery<TDocument>,
  //   update: UpdateQuery<TDocument>,
  // ) {
  //   const document = await this.model.updateMany(
  //     { siteId: filterQuery.siteId },
  //     { $set: update },
  //   );
  //   return document;
  // }

  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async deleteOne(filterQuery: FilterQuery<TDocument>) {
    return this.model.deleteOne(filterQuery);
  }

  async deleteMany(filterQuery: FilterQuery<TDocument>) {
    return this.model.deleteMany(filterQuery);
  }

  findAll(paginationQuery: ListInput, filterQuery: FilterQuery<TDocument>) {
    const { limit, offset } = paginationQuery;
    return this.model
      .find(filterQuery, {}, { lean: true })
      .sort({ 'dataWear.updateDate.lastUpdatedAt': -1 })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async All(paginationQuery: ListInput, filterQuery: FilterQuery<TDocument>) {
    const count = await this.model.count(filterQuery);
    const data = await this.findAll(paginationQuery, filterQuery);
    return { data, count };
  }

  private productCreated({
    name,
    mark,
    promotion,
    inStock,
    price,
    discountPrice,
    description,
    siteId,
    parentId,
    uid,
    type,
  }: CreateProduct) {
    return {
      _id: new Types.ObjectId(),
      siteId: siteId,
      parentId: parentId,
      slug: slug(name),
      dataProduct: {
        mark: {
          label: mark,
          slug: slug(mark),
        },
        promotion: {
          label: promotion,
          slug: slug(promotion),
        },
        type: {
          label: type,
          slug: slug(type),
        },
        inStock: inStock,
        price: price,
        discountPrice: discountPrice,
        seoProduct: {
          title: capitalizar(name),
          href: slug(name),
          description: description,
        },
        updateDate: {
          createdAt: new Date(),
          lastUpdatedAt: new Date(),
          register: [
            {
              uid: uid,
              change: 'create product',
              updatedAt: new Date(),
            },
          ],
        },
      },
    };
  }
  private productUpdate({
    name,
    mark,
    promotion,
    inStock,
    price,
    discountPrice,
    description,
    siteId,
    parentId,
    uid,
    type,
    tags,
  }: UpdateProduct) {
    return {
      $set: {
        'dataProduct.mark': {
          label: mark,
          slug: slug(mark),
        },
        'dataProduct.promotion': {
          label: promotion,
          slug: slug(promotion),
        },
        'dataProduct.inStock': inStock,
        'dataProduct.price': price,
        'dataProduct.discountPrice': discountPrice,
        'dataProduct.tags': tags.map((data) => ({
          uid: uuidv3(),
          text: data,
          slug: slug(data),
        })),
        'dataProduct.seoProduct.title': capitalizar(name),
        'dataProduct.seoProduct.href': slug(name),
        'dataProduct.seoProduct.description': description,
        'dataProduct.updateDate.lastUpdatedAt': new Date(),
        slug: slug(name),
      },
      $push: {
        'dataProduct.updateDate.register': {
          uid: uid,
          change: 'product update',
          updatedAt: new Date(),
        },
      },
    };
  }

  private productImage({ images, type, uid }: UpdateImageProduct) {
    return {
      $set: {
        'dataProduct.imageProduct': images.map((data) => ({
          uid: uuidv3(),
          src: data.src,
          alt: data.alt,
        })),
        'dataProduct.seoProduct.image.src': images[0].src,
        'dataProduct.seoProduct.image.alt': images[0].alt,
        'dataProduct.updateDate.lastUpdatedAt': new Date(),
      },
      $push: {
        'dataProduct.updateDate.register': {
          uid: uid,
          change: 'image product update',
          updatedAt: new Date(),
        },
      },
    };
  }
}
