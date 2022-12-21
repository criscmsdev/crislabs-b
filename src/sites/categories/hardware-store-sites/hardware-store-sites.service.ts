import { Injectable } from '@nestjs/common';
import {
  CreateSite,
  UpdateDB,
  UpdateImage,
  UpdateSite,
} from 'src/common/dto/site.input';
import { HardwareStoreSite } from 'src/common/entities/site.model';
import { SiteDocument } from 'src/common/entities/site.schema';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { HardwareStoreSitesRepository } from './hardware-store-sites.repository';

@Injectable()
export class HardwareStoreSitesService {
  constructor(private readonly siteRepository: HardwareStoreSitesRepository) {}
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

  private toModel(siteDocument: SiteDocument): HardwareStoreSite {
    return {
      _id: siteDocument._id.toHexString(),
      dataSite: siteDocument.dataSite,
      url: siteDocument.url,
    };
  }
}
