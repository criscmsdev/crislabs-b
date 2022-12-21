// import { Field, ObjectType } from '@nestjs/graphql';
// import { AbstractModel } from 'src/common/abstract/abstract.model';
// import { RelayTypes } from 'src/common/pagination/relay/relay.types';
// import { Image, Seo, Tags, UpdateDate } from '../site.model';

// @ObjectType()
// export class Product extends AbstractModel {
//   @Field()
//   readonly slug: string;
//   @Field()
//   readonly siteId: string;
//   @Field()
//   readonly parentId: string;
// }

// @ObjectType()
// export class DataProduct {
//   @Field(() => Type)
//   readonly type: Type | string;
//   // @Field()
//   // readonly name: string;
//   @Field(() => Mark)
//   readonly mark: Mark | string;
//   @Field()
//   readonly inStock: number;
//   @Field()
//   readonly price: number;
//   @Field()
//   readonly discountPrice: number;
//   // @Field()
//   // readonly description: string;
//   @Field(() => Promotion)
//   readonly promotion: Promotion | string;

//   @Field({ nullable: true })
//   readonly details?: string;

//   @Field({ nullable: true })
//   readonly featured?: string;

//   @Field({ nullable: true })
//   readonly specs?: string;

//   @Field(() => [Tags])
//   readonly tags?: Tags[];

//   @Field(() => [Image])
//   readonly imageProduct: Image[];

//   @Field(() => Seo)
//   readonly seoWear: Seo | string;

//   @Field(() => UpdateDate)
//   readonly updateDate: UpdateDate | string;
// }

// @ObjectType()
// export class Type {
//   @Field()
//   label: string;
//   @Field()
//   slug: string;
// }
// @ObjectType()
// export class Mark extends Type {}

// @ObjectType()
// export class Promotion extends Type {}

// @ObjectType()
// export class DeleteWears {
//   @Field(() => [String])
//   ids: string[];
//   @Field()
//   type: string;
// }

// @ObjectType()
// export class ColorWear {
//   @Field()
//   readonly uid: string;
//   @Field()
//   readonly name: string;
//   @Field()
//   readonly class: string;
//   @Field()
//   readonly selectedClass: string;
// }

// @ObjectType()
// export class SizesWear {
//   @Field()
//   readonly uid: string;
//   @Field()
//   readonly name: string;
//   @Field()
//   readonly inStock: number;
// }

// @ObjectType()
// export class WearProduct extends Product {
//   @Field(() => DataProduct)
//   readonly dataWear: DataProduct | string;
// }

// @ObjectType()
// export class HardwareStoreProduct extends Product {
//   @Field(() => DataProduct)
//   readonly dataHardwareStore: DataProduct | string;
// }

// @ObjectType()
// export class ClothingProduct extends WearProduct {}
// @ObjectType()
// export class BackpackProduct extends WearProduct {}
// @ObjectType()
// export class HandbagProduct extends WearProduct {}

// // @ObjectType()
// // export class Furniture extends Wear {}

// @ObjectType()
// export class ToolProduct extends HardwareStoreProduct {}

// // @ObjectType()
// // export class Glasses extends Wear {}
// // @ObjectType()
// // export class Engine extends Wear {}

// @ObjectType()
// export class ListWearProduct extends RelayTypes<WearProduct>(WearProduct) {}
// @ObjectType()
// export class ListHardwareStoreProduct extends RelayTypes<HardwareStoreProduct>(
//   HardwareStoreProduct,
// ) {}
