import {
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { capitalizar, slug } from 'utils/function';
import { CreatePage, UpdatePage } from '../dto/page.input';
import { InputImage, UpdateImage } from '../dto/site.input';
import { ListInput } from '../pagination/dto/list.input';
import { AbstractDocument } from './abstract.schema';
// import { CreatePage, UpdatePage } from '../../pages/dto/page.input';

// import { UpdateImage } from 'src/product/dto/product.input';

export abstract class AbstractRepositoryPage<
  TDocument extends AbstractDocument,
> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}
  async add(input: CreatePage): Promise<TDocument> {
    const page = await this.model.findOne(
      {
        slug: slug(input.title),
        siteId: input.siteId,
        parentId: input.parentId,
      },
      {},
      { lean: true },
    );

    if (page) {
      // this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new UnprocessableEntityException(
        `You already have an item registered with that name "${input.title}"`,
      );
    }
    const createdDocument = new this.model(this.pageCreated(input));
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async update(
    input: UpdatePage,
    options: Record<string, unknown> = { lean: true, new: true },
  ) {
    const page = await this.model.findOne(
      {
        _id: { $ne: input.id },
        slug: slug(input.title),
        siteId: input.siteId,
        parentId: input.parentId,
      },
      {},
      { lean: true },
    );
    if (page) {
      // this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new UnprocessableEntityException(
        `You already have an item registered with that name "${input.title}"`,
      );
    }
    const document = await this.model.findOneAndUpdate(
      { _id: input.id },
      this.pageUpdate(input),
      options,
    );
    if (!document) {
      // this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }
  async updateImage(
    input: UpdateImage,
    options: Record<string, unknown> = { lean: true, new: true },
  ) {
    const document = await this.model.findOneAndUpdate(
      { _id: input.id },
      this.pageImage(input),
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

  async updateMany(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    const document = await this.model.updateMany(
      { siteId: filterQuery.siteId },
      { $set: update },
    );
    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async deleteOne(filterQuery: FilterQuery<TDocument>) {
    return this.model.deleteOne(filterQuery);
  }

  async deleteMany(filterQuery: FilterQuery<TDocument>) {
    return this.model.deleteMany(filterQuery);
  }

  async deleteManyPages(ids: string[]) {
    return this.model.deleteMany({ _id: { $in: ids } });
  }

  findAll(paginationQuery: ListInput, filterQuery: FilterQuery<TDocument>) {
    const { limit, offset } = paginationQuery;
    return this.model
      .find(filterQuery, {}, { lean: true })
      .sort({ 'dataPage.updateDate.lastUpdatedAt': -1 })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async All(paginationQuery: ListInput, filterQuery: FilterQuery<TDocument>) {
    const count = await this.model.count(filterQuery);
    const data = await this.findAll(paginationQuery, filterQuery);
    return { data, count };
  }

  private pageCreated({
    type,
    title,
    description,
    parentId,
    siteId,
    uid,
  }: CreatePage) {
    return {
      _id: new Types.ObjectId(),
      dataPage: {
        type: type,
        seoPage: {
          title: capitalizar(title),
          href: slug(title) === 'home' ? '' : slug(title),
          description: description,
        },
        updateDate: {
          createdAt: new Date(),
          lastUpdatedAt: new Date(),
          register: [
            {
              uid: uid,
              change: 'create page',
              updatedAt: new Date(),
            },
          ],
        },
      },
      parentId: parentId,
      siteId: siteId,
      slug: slug(title),
    };
  }
  private pageUpdate({ type, title, description, uid }: UpdatePage) {
    return {
      $set: {
        'dataPage.type': type,
        'dataPage.seoPage.title': capitalizar(title),
        'dataPage.seoPage.href': slug(title),
        'dataPage.seoPage.description': description,
        'dataPage.updateData.lastUpdatedAt': new Date(),
        slug: slug(title),
      },
      $push: {
        'dataPage.updateDate.register': {
          uid: uid,
          change: 'page update',
          updatedAt: new Date(),
        },
      },
    };
  }
  private pageImage({ images, type, uid }: UpdateImage) {
    const { src, alt } = images as InputImage;

    return {
      $set: {
        'dataPage.seoPage.image.src': src,
        'dataPage.seoPage.image.alt': alt,
        'dataPage.updateDate.lastUpdatedAt': new Date(),
      },
      $push: {
        'dataPage.updateDate.register': {
          uid: uid,
          change: 'image update',
          updatedAt: new Date(),
        },
      },
    };
  }
}
