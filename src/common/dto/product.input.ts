import { InputType, Field, PartialType, ID, OmitType } from '@nestjs/graphql';

@InputType()
export class CreateProduct {
  @Field()
  readonly name: string;

  @Field()
  readonly mark: string;

  @Field()
  readonly description: string;

  @Field()
  readonly promotion: string;

  @Field()
  readonly inStock: number;

  @Field()
  readonly price: number;

  @Field()
  readonly discountPrice: number;
  @Field()
  readonly siteId: string;
  @Field()
  readonly parentId: string;
  @Field()
  readonly uid: string;

  @Field()
  readonly type: string;
}

@InputType()
export class UpdateProduct extends PartialType(CreateProduct) {
  @Field()
  readonly id: string;
  @Field(() => [String])
  readonly tags: string[];
  @Field()
  readonly details: string;
  @Field()
  readonly featured: string;
  @Field()
  readonly specs: string;
}

@InputType()
export class UpdateSpecsProduct {
  @Field()
  readonly id: string;
  @Field()
  readonly specs: string;
  @Field()
  readonly uid: string;
  @Field()
  readonly type: string;
}
@InputType()
export class UpdateDetailsProduct {
  @Field()
  readonly id: string;
  @Field()
  readonly text: string;
  @Field()
  readonly uid: string;
  @Field()
  readonly type: string;
}
