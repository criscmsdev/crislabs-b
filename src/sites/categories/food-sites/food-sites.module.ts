import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodSite } from 'src/common/entities/site.model';
import { FoodSiteSchema } from 'src/common/entities/site.schema';
import { FoodSitesRepository } from 'src/sites/categories/food-sites/food.sites.repository';
import { FoodSiteResolver } from './food-sites.resolver';
import { FoodSitesService } from './food-sites.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: FoodSite.name, schema: FoodSiteSchema }],
      'foodDB',
    ),
  ],
  providers: [FoodSitesService, FoodSiteResolver, FoodSitesRepository],
})
export class FoodSitesModule {}
