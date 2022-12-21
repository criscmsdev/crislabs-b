import {
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { capitalizar, slug, uuidv3, uuidv4 } from 'utils/function';
import { CreateArticle, UpdateArticle } from '../dto/article.input';
import { CreatePage, UpdatePage } from '../dto/page.input';
import { InputImage, UpdateImage } from '../dto/site.input';
import { ListInput } from '../pagination/dto/list.input';
import { AbstractDocument } from './abstract.schema';
// import { CreatePage, UpdatePage } from '../../pages/dto/page.input';

// import { UpdateImage } from 'src/product/dto/product.input';

export abstract class AbstractRepositoryArticle<
  TDocument extends AbstractDocument,
> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async add(input: CreateArticle): Promise<TDocument> {
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
    const createdDocument = new this.model(this.articleCreated(input));
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async update(
    input: UpdateArticle,
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
      this.articleUpdate(input),
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
    input: UpdateImage,
    options: Record<string, unknown> = { lean: true, new: true },
  ) {
    const document = await this.model.findOneAndUpdate(
      { _id: input.id },
      this.articleImage(input),
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

  // async deleteManyPages(ids: string[]) {
  //   return this.model.deleteMany({ _id: { $in: ids } });
  // }

  findAll(paginationQuery: ListInput, filterQuery: FilterQuery<TDocument>) {
    const { limit, offset } = paginationQuery;
    return this.model
      .find(filterQuery, {}, { lean: true })
      .sort({ 'dataArticle.updateDate.createdAt': 1 })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async All(paginationQuery: ListInput, filterQuery: FilterQuery<TDocument>) {
    const count = await this.model.count(filterQuery);
    const data = await this.findAll(paginationQuery, filterQuery);
    return { data, count };
  }

  private articleCreated({
    title,
    description,
    siteId,
    parentId,
    category,
    uid,
  }: CreateArticle) {
    return {
      _id: new Types.ObjectId(),
      siteId: siteId,
      parentId: parentId,
      slug: slug(title),
      dataArticle: {
        category: category,
        author: uid,
        seoArticle: {
          title: capitalizar(title),
          href: slug(title),
          description: description,
        },
        updateDate: {
          createdAt: new Date(),
          lastUpdatedAt: new Date(),
          register: [
            {
              uid: uid,
              change: 'create article',
              updatedAt: new Date(),
            },
          ],
        },
      },
    };
  }
  private articleUpdate({
    category,
    title,
    description,
    uid,
    content,
    meta,
    tags,
  }: UpdateArticle) {
    return {
      $set: {
        'dataArticle.content': content,
        'dataArticle.category': category,
        'dataArticle.meta': meta,
        'dataArticle.tags': tags.map((data) => ({
          uid: uuidv3(),
          text: data,
          slug: slug(data),
        })),
        'dataArticle.seoArticle.title': capitalizar(title),
        'dataArticle.seoArticle.href': slug(title),
        'dataArticle.seoArticle.description': description,
        'dataArticle.updateDate.lastUpdatedAt': new Date(),
        slug: slug(title),
      },
      $push: {
        'dataArticle.updateDate.register': {
          uid: uid,
          change: 'article update',
          updatedAt: new Date(),
        },
      },
    };
  }
  private articleImage({ images, type, uid }: UpdateImage) {
    const { src, alt } = images as InputImage;

    return {
      $set: {
        'dataArticle.thumbnail.src': src,
        'dataArticle.thumbnail.alt': alt,
        'dataArticle.seoArticle.image.src': src,
        'dataArticle.seoArticle.image.alt': alt,
        'dataArticle.updateDate.lastUpdatedAt': new Date(),
      },
      $push: {
        'dataArticle.updateDate.register': {
          uid: uid,
          change: 'image article update',
          updatedAt: new Date(),
        },
      },
    };
  }
}
