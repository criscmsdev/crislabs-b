import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types } from 'mongoose';
import { capitalizar, slug, uuidv3 } from 'utils/function';
import {
  CreateSite,
  InputImage,
  UpdateDB,
  UpdateImage,
  UpdateSite,
} from '../dto/site.input';
import { ListInput } from '../pagination/dto/list.input';
import { AbstractDocument } from './abstract.schema';
// import { CreatePage, UpdatePage } from '../../pages/dto/page.input';

// import {
//   CreateSite,
//   UpdateDataBase,
//   UpdateImage,
//   UpdateSite,
// } from '../input/site.input';
// import { UpdateImage } from 'src/product/dto/product.input';

export abstract class AbstractRepositorySite<T extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<T>) {}

  async add(input: CreateSite): Promise<T> {
    const createdDocument = new this.model(this.siteCreated(input));
    return (await createdDocument.save()).toJSON() as unknown as T;
  }

  async update(
    input: UpdateSite,
    options: Record<string, unknown> = { lean: true, new: true },
  ) {
    const document = await this.model.findOneAndUpdate(
      { _id: input.id },
      this.siteUpdate(input),
      options,
    );
    if (!document) {
      throw new NotFoundException('Document not found.');
    }
    return document;
  }
  async updateDB(
    input: UpdateDB,
    options: Record<string, unknown> = { lean: true, new: true },
  ) {
    const document = await this.model.findOneAndUpdate(
      { _id: input.id },
      {
        $set: {
          'dataSite.dbSite': input.type.map((data) => ({
            uid: uuidv3(),
            label: capitalizar(data),
            slug: slug(data),
          })),
          'dataSite.updateDate.lastUpdatedAt': new Date(),
        },
        $push: {
          'dataSite.updateDate.register': {
            change: 'updated site db',
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

  async updateImage(
    input: UpdateImage,
    options: Record<string, unknown> = { lean: true, new: true },
  ) {
    const document = await this.model.findOneAndUpdate(
      { _id: input.id },
      this.siteImage(input),
      options,
    );
    if (!document) {
      // this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }

  async findOne(filterQuery: FilterQuery<T>): Promise<T> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }

  async find(filterQuery: FilterQuery<T>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async deleteOne(filterQuery: FilterQuery<T>) {
    return this.model.deleteOne(filterQuery);
  }

  async deleteMany(filterQuery: FilterQuery<T>) {
    return this.model.deleteMany(filterQuery);
  }

  async deleteManyPages(ids: string[]) {
    return this.model.deleteMany({ _id: { $in: ids } });
  }

  findAll(paginationQuery: ListInput, filterQuery: FilterQuery<T>) {
    const { limit, offset } = paginationQuery;
    return this.model
      .find(filterQuery, {}, { lean: true })
      .sort({ 'dataSite.updateDate.lastUpdatedAt': -1 })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async All(paginationQuery: ListInput, filterQuery: FilterQuery<T>) {
    const count = await this.model.count();
    const data = await this.findAll(paginationQuery, filterQuery);
    return { data, count };
  }

  private siteCreated({
    domain,
    name,
    description,
    type,
    clientId,
    uid,
  }: CreateSite) {
    const web = domain.split('.');
    const nameDomain = web[0];
    web.shift();
    const dlt = web.join('.');
    return {
      _id: new Types.ObjectId(),
      dataSite: {
        name: name,
        description: description,
        // dataBase: [],
        infoSite: {
          domain: {
            name: nameDomain,
            dlt: dlt,
          },
          clientId: clientId,
        },
        type: type,
        updateDate: {
          createdAt: new Date(),
          lastUpdatedAt: new Date(),
          register: [
            {
              uid: uid,
              change: 'created site',
              updatedAt: new Date(),
            },
          ],
        },
      },
      url: domain,
    };
  }
  private siteUpdate({ domain, name, description, type, uid }: UpdateSite) {
    const web = domain.split('.');
    const nameDomain = web[0];
    web.shift();
    const dlt = web.join('.');
    return {
      $set: {
        'dataSite.name': name,
        'dataSite.description': description,
        'dataSite.type': type,
        'dataSite.infoSite.domain': {
          name: nameDomain,
          dlt: dlt,
        },
        'dataSite.updateDate.lastUpdatedAt': new Date(),
        url: domain,
      },
      $push: {
        'dataSite.updateDate.register': {
          uid: uid,
          change: 'updated site',
          updatedAt: new Date(),
        },
      },
    };
  }
  private siteImage({ images, type, uid }: UpdateImage) {
    const { src, alt } = images as InputImage;
    return {
      $set:
        type === 'logo'
          ? {
              'dataSite.imageSite.logo': {
                src: src,
                alt: alt,
              },
              'dataSite.updateDate.lastUpdatedAt': new Date(),
            }
          : type === 'banner'
          ? {
              'dataSite.imageSite.banner': {
                src: src,
                alt: alt,
              },
              'dataSite.updateDate.lastUpdatedAt': new Date(),
            }
          : {
              'dataSite.imageSite.icon': {
                src: src,
                alt: alt,
              },
              'dataSite.updateDate.lastUpdatedAt': new Date(),
            },
      $push: {
        'dataSite.updateDate.register': {
          uid: uid,
          change: `${type} image update`,
          updatedAt: new Date(),
        },
      },
    };
  }
}
