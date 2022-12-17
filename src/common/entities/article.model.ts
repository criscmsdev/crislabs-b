import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from '../abstract/abstract.model';
import { RelayTypes } from 'src/common/pagination/relay/relay.types';
import { Image, Seo, Tags, UpdateDate } from './site.model';

@ObjectType()
export class Article extends AbstractModel {
  @Field(() => DataArticle)
  readonly dataArticle: DataArticle | string;
  @Field()
  readonly siteId: string;
  @Field()
  readonly parentId: string;
  @Field()
  readonly slug: string;
}
@ObjectType()
export class DataArticle {
  @Field()
  readonly title: string;
  @Field({ nullable: true })
  readonly content?: string;
  @Field()
  readonly category: string;
  @Field()
  readonly description: string;
  @Field({ nullable: true })
  readonly meta?: string;
  @Field(() => [Tags], { nullable: true })
  readonly tags?: Tags[];
  @Field()
  readonly author: string;
  @Field(() => Image, { nullable: true })
  readonly thumbnail?: Image | string;
  @Field(() => Seo)
  readonly seoArticle: Seo | string;
  @Field(() => UpdateDate)
  readonly updateDate: UpdateDate | string;
}

@ObjectType()
export class ListArticle extends RelayTypes<Article>(Article) {}

@ObjectType()
export class FoodArticle extends Article {}
@ObjectType()
export class MarketingArticle extends Article {}
