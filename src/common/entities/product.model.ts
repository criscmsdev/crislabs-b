import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from '../abstract/abstract.model';
import { RelayTypes } from '../pagination/relay/relay.types';
import { Image, Seo, Tags, UpdateDate } from './site.model';

@ObjectType()
export class Product extends AbstractModel {
  @Field(() => DataProduct)
  readonly dataProduct: DataProduct | string;
  @Field()
  readonly slug: string;
  @Field()
  readonly siteId: string;
  @Field()
  readonly parentId: string;
}

@ObjectType()
export class DataProduct {
  @Field(() => Type)
  readonly type: Type | string;
  @Field(() => Mark)
  readonly mark: Mark | string;
  @Field()
  readonly inStock: number;
  @Field()
  readonly price: number;
  @Field()
  readonly discountPrice: number;
  // @Field()
  // readonly description: string;
  @Field(() => Promotion)
  readonly promotion: Promotion | string;

  @Field({ nullable: true })
  readonly details?: string;

  @Field({ nullable: true })
  readonly featured?: string;

  @Field({ nullable: true })
  readonly specs?: string;

  @Field(() => [Tags])
  readonly tags?: Tags[];

  @Field(() => [Image])
  readonly imageProduct: Image[];

  @Field(() => Seo)
  readonly seoProduct: Seo | string;

  @Field(() => UpdateDate)
  readonly updateDate: UpdateDate | string;
}

@ObjectType()
export class Type {
  @Field()
  label: string;
  @Field()
  slug: string;
}
@ObjectType()
export class Mark extends Type {}

@ObjectType()
export class Promotion extends Type {}

@ObjectType()
export class ToolProduct extends Product {}

// @ObjectType()
// export class ListWearProduct extends RelayTypes<WearProduct>(WearProduct) {}
@ObjectType()
export class ListHardwareStoreProduct extends RelayTypes<Product>(Product) {}
