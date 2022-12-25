import { Injectable } from '@nestjs/common';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { HardwareStorePage2 } from 'src/common/entities/page.model';
import { PageDocument } from 'src/common/entities/page.schema';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { HardwareStorePages2Repository } from '../hardware-store-pages.repository';

@Injectable()
export class HardwareStorePages2Service {
  constructor(private readonly pageRepository: HardwareStorePages2Repository) {}

  async create(input: CreatePage) {
    const document = await this.pageRepository.add(input);
    return this.toModel(document);
  }

  async update(input: UpdatePage) {
    const document = await this.pageRepository.update(input);
    return this.toModel(document);
  }

  async updateImage(input: UpdateImage) {
    const document = await this.pageRepository.updateImage(input);
    return this.toModel(document);
  }

  async findPage(id: string) {
    const document = await this.pageRepository.findOne({ _id: id });
    return this.toModel(document);
  }
  
  async findPageBySlug(slug: string, siteId: string) {
    const document = await this.pageRepository.findOne({
      slug: slug,
      siteId: siteId,
    });
    return this.toModel(document);
  }


  findPages() {
    return this.pageRepository.find({});
  }

  async deletePage(id: string) {
    await this.pageRepository.deleteOne({ _id: id });
    return id;
  }

  async deletePagesById(ids: string[]) {
    await this.pageRepository.deleteMany({ _id: { $in: ids } });
    return ids;
  }

  async deleteAllPages() {
    await this.pageRepository.deleteMany({});
    return 'pages deleted';
  }

  findPagesByParentId(parentId: string) {
    return this.pageRepository.find({ parentId: parentId });
  }

  all(pagination: ListInput, parentId: string) {
    return this.pageRepository.All(pagination, { parentId: parentId });
  }

  private toModel({
    _id,
    dataPage,
    siteId,
    parentId,
    slug,
  }: PageDocument): HardwareStorePage2 {
    return {
      _id: _id.toHexString(),
      dataPage: dataPage,
      siteId: siteId,
      parentId: parentId,
      slug: slug,
    };
  }
}
