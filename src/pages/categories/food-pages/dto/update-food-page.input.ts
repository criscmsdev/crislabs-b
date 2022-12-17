import { CreateFoodPageInput } from './create-food-page.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFoodPageInput extends PartialType(CreateFoodPageInput) {
  @Field(() => Int)
  id: number;
}
