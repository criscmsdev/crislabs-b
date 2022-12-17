import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FoodPagesService } from './food-pages.service';
import { FoodPage } from './entities/food-page.entity';
import { CreateFoodPageInput } from './dto/create-food-page.input';
import { UpdateFoodPageInput } from './dto/update-food-page.input';

@Resolver(() => FoodPage)
export class FoodPagesResolver {
  constructor(private readonly foodPagesService: FoodPagesService) {}

  @Mutation(() => FoodPage)
  createFoodPage(@Args('createFoodPageInput') createFoodPageInput: CreateFoodPageInput) {
    return this.foodPagesService.create(createFoodPageInput);
  }

  @Query(() => [FoodPage], { name: 'foodPages' })
  findAll() {
    return this.foodPagesService.findAll();
  }

  @Query(() => FoodPage, { name: 'foodPage' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.foodPagesService.findOne(id);
  }

  @Mutation(() => FoodPage)
  updateFoodPage(@Args('updateFoodPageInput') updateFoodPageInput: UpdateFoodPageInput) {
    return this.foodPagesService.update(updateFoodPageInput.id, updateFoodPageInput);
  }

  @Mutation(() => FoodPage)
  removeFoodPage(@Args('id', { type: () => Int }) id: number) {
    return this.foodPagesService.remove(id);
  }
}
