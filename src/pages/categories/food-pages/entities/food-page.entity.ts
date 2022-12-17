import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class FoodPage {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
