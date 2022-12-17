import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WearPages0Repository } from './pages/categories/wear-pages/wear-pages.repository';
import { WearSitesRepository } from './sites/categories/wear-sites/wear-sites.repository';

@Injectable()
export class AppService {
  // constructor(
  //   private readonly wearSiteRepository: WearSitesRepository,
  //   private readonly wearPage0Repository: WearPages0Repository,
  // ) {}

  getHello(): string {
    return 'Hello World!';
  }

  // @Cron('0 0 * * *')
  // async handleCronDeletePages0() {
  //   // this.logger.debug('Called every 60 seconds');
  //   const sites = await this.wearSiteRepository.find({});
  //   // const pages0 = await this.wearPage0Repository.find({});

  //   await this.wearPage0Repository.deleteMany({
  //     parentId: { $in: sites.map((data) => data._id.toString()) },
  //   });
  //   // await this.page1Repository.deleteManyPagesByParentCron(pages0Id);
  //   // await this.page2Repository.deleteManyPagesByParentCron(pages1Id);
  //   // console.log('sites Deleted');
  // }
}
