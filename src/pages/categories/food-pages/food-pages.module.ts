import { Module } from '@nestjs/common';
import { FoodPagesService } from './food-pages.service';
import { FoodPagesResolver } from './food-pages.resolver';

@Module({
  providers: [FoodPagesResolver, FoodPagesService]
})
export class FoodPagesModule {}
