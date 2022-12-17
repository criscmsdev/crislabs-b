import { Injectable } from '@nestjs/common';
import {
  CreateSite,
  UpdateDB,
  UpdateImage,
  UpdateSite,
} from 'src/common/dto/site.input';
import { WearSite } from 'src/common/entities/site.model';
import { SiteDocument } from 'src/common/entities/site.schema';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { WearSitesRepository } from './wear-sites.repository';

@Injectable()
export class WearSitesService {
  constructor(private readonly siteRepository: WearSitesRepository) {}
  async create(input: CreateSite) {
    const data = await this.siteRepository.add(input);

    return this.toModel(data);
  }
  async update(input: UpdateSite) {
    const data = await this.siteRepository.update(input);
    return this.toModel(data);
  }

  async updateDB(input: UpdateDB) {
    const data = await this.siteRepository.updateDB(input);
    return this.toModel(data);
  }

  async updateImage(input: UpdateImage) {
    const data = await this.siteRepository.updateImage(input);
    return this.toModel(data);
  }

  async deleteSite(id: string) {
    await this.siteRepository.deleteOne({ _id: id });
    return id;
  }

  async deleteSitesById(ids: string[]) {
    await this.siteRepository.deleteMany({ _id: { $in: ids } });
    return ids;
  }

  async deleteAllSites() {
    await this.siteRepository.deleteMany({});
    return 'sites deleted';
  }

  async getSite(id: string) {
    const data = await this.siteRepository.findOne({ _id: id });
    return this.toModel(data);
  }

  getSites() {
    return this.siteRepository.find({});
  }

  all(pagination: ListInput) {
    return this.siteRepository.All(pagination, {});
  }

  private toModel(siteDocument: SiteDocument): WearSite {
    return {
      _id: siteDocument._id.toHexString(),
      dataSite: siteDocument.dataSite,
      url: siteDocument.url,
    };
  }
}
