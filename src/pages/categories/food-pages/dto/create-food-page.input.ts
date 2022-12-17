import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFoodPageInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
