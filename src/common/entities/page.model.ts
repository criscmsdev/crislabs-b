import { Field, ID, ObjectType } from '@nestjs/graphql';
import { RelayTypes } from 'src/common/pagination/relay/relay.types';
import { AbstractModel } from '../abstract/abstract.model';
import { Seo, UpdateDate } from './site.model';

@ObjectType()
export class Page extends AbstractModel {
  @Field(() => DataPage)
  readonly dataPage: DataPage | string;
  @Field()
  readonly slug: string;
  @Field()
  readonly siteId: string;
  @Field()
  readonly parentId: string;
}

@ObjectType()
export class DataPage {
  @Field()
  readonly type: string;
  @Field({ nullable: true })
  readonly icon?: string;
  @Field(() => Seo)
  readonly seoPage: Seo | string;
  @Field(() => [ComponentPage])
  readonly section?: ComponentPage[];
  @Field(() => UpdateDate)
  readonly updateDate: UpdateDate | string;
}

@ObjectType()
export class ComponentPage {
  @Field()
  readonly uid: string;
  @Field()
  readonly component: string;
  @Field()
  readonly html: string;
}

@ObjectType()
export class WearPage0 extends Page {}
@ObjectType()
export class WearPage1 extends Page {}
@ObjectType()
export class WearPage2 extends Page {}
@ObjectType()
export class WearPage3 extends Page {}
@ObjectType()
export class WearPage4 extends Page {}
@ObjectType()
export class WearPage5 extends Page {}
@ObjectType()
export class WearPage6 extends Page {}
@ObjectType()
export class WearPage7 extends Page {}
@ObjectType()
export class WearPage8 extends Page {}
@ObjectType()
export class WearPage9 extends Page {}
@ObjectType()
export class WearPage10 extends Page {}
@ObjectType()
export class WearPage11 extends Page {}
@ObjectType()
export class WearPage12 extends Page {}

@ObjectType()
export class FoodPage0 extends Page {}
@ObjectType()
export class FoodPage1 extends Page {}
@ObjectType()
export class FoodPage2 extends Page {}
@ObjectType()
export class FoodPage3 extends Page {}
@ObjectType()
export class FoodPage4 extends Page {}
@ObjectType()
export class FoodPage5 extends Page {}
@ObjectType()
export class FoodPage6 extends Page {}
@ObjectType()
export class FoodPage7 extends Page {}
@ObjectType()
export class FoodPage8 extends Page {}
@ObjectType()
export class FoodPage9 extends Page {}
@ObjectType()
export class FoodPage10 extends Page {}
@ObjectType()
export class FoodPage11 extends Page {}
@ObjectType()
export class FoodPage12 extends Page {}

@ObjectType()
export class MarketingPage0 extends Page {}
@ObjectType()
export class MarketingPage1 extends Page {}
@ObjectType()
export class MarketingPage2 extends Page {}
@ObjectType()
export class MarketingPage3 extends Page {}
@ObjectType()
export class MarketingPage4 extends Page {}
@ObjectType()
export class MarketingPage5 extends Page {}
@ObjectType()
export class MarketingPage6 extends Page {}
@ObjectType()
export class MarketingPage7 extends Page {}
@ObjectType()
export class MarketingPage8 extends Page {}
@ObjectType()
export class MarketingPage9 extends Page {}
@ObjectType()
export class MarketingaPge10 extends Page {}
@ObjectType()
export class MarketingPage11 extends Page {}
@ObjectType()
export class MarketingPage12 extends Page {}

@ObjectType()
export class HardwareStorePage0 extends Page {}
@ObjectType()
export class HardwareStorePage1 extends Page {}
@ObjectType()
export class HardwareStorePage2 extends Page {}
@ObjectType()
export class HardwareStorePage3 extends Page {}
@ObjectType()
export class HardwareStorePage4 extends Page {}
@ObjectType()
export class HardwareStorePage5 extends Page {}
@ObjectType()
export class HardwareStorePage6 extends Page {}
@ObjectType()
export class HardwareStorePage7 extends Page {}
@ObjectType()
export class HardwareStorePage8 extends Page {}
@ObjectType()
export class HardwareStorePage9 extends Page {}
@ObjectType()
export class HardwareStorePage10 extends Page {}
@ObjectType()
export class HardwareStorePage11 extends Page {}
@ObjectType()
export class HardwareStorePage12 extends Page {}

@ObjectType()
export class GlassesPage0 extends Page {}
@ObjectType()
export class GlassesPage1 extends Page {}
@ObjectType()
export class GlassesPage2 extends Page {}
@ObjectType()
export class GlassesPage3 extends Page {}
@ObjectType()
export class GlassesPage4 extends Page {}
@ObjectType()
export class GlassesPage5 extends Page {}
@ObjectType()
export class GlassesPage6 extends Page {}
@ObjectType()
export class GlassesPage7 extends Page {}
@ObjectType()
export class GlassesPage8 extends Page {}
@ObjectType()
export class GlassesPage9 extends Page {}
@ObjectType()
export class GlassesPage10 extends Page {}
@ObjectType()
export class GlassesPage11 extends Page {}
@ObjectType()
export class GlassesPage12 extends Page {}

@ObjectType()
export class FurniturePage0 extends Page {}
@ObjectType()
export class FurniturePage1 extends Page {}
@ObjectType()
export class FurniturePage2 extends Page {}
@ObjectType()
export class FurniturePage3 extends Page {}
@ObjectType()
export class FurniturePage4 extends Page {}
@ObjectType()
export class FurniturePage5 extends Page {}
@ObjectType()
export class FurniturePage6 extends Page {}
@ObjectType()
export class FurniturePage7 extends Page {}
@ObjectType()
export class FurniturePage8 extends Page {}
@ObjectType()
export class FurniturePage9 extends Page {}
@ObjectType()
export class FurniturePage10 extends Page {}
@ObjectType()
export class FurniturePage11 extends Page {}
@ObjectType()
export class FurniturePage12 extends Page {}

@ObjectType()
export class EducationPage0 extends Page {}
@ObjectType()
export class EducationPage1 extends Page {}
@ObjectType()
export class EducationPage2 extends Page {}
@ObjectType()
export class EducationPage3 extends Page {}
@ObjectType()
export class EducationPage4 extends Page {}
@ObjectType()
export class EducationPage5 extends Page {}
@ObjectType()
export class EducationPage6 extends Page {}
@ObjectType()
export class EducationPage7 extends Page {}
@ObjectType()
export class EducationPage8 extends Page {}
@ObjectType()
export class EducationPage9 extends Page {}
@ObjectType()
export class EducationPage10 extends Page {}
@ObjectType()
export class EducationPage11 extends Page {}
@ObjectType()
export class EducationPage12 extends Page {}

@ObjectType()
export class ToolPage0 extends Page {}
@ObjectType()
export class ToolPage1 extends Page {}
@ObjectType()
export class ToolPage2 extends Page {}
@ObjectType()
export class ToolPage3 extends Page {}
@ObjectType()
export class ToolPage4 extends Page {}
@ObjectType()
export class ToolPage5 extends Page {}
@ObjectType()
export class ToolPage6 extends Page {}
@ObjectType()
export class ToolPage7 extends Page {}
@ObjectType()
export class ToolPage8 extends Page {}
@ObjectType()
export class ToolPage9 extends Page {}
@ObjectType()
export class ToolPage10 extends Page {}
@ObjectType()
export class ToolPage11 extends Page {}
@ObjectType()
export class ToolPage12 extends Page {}

@ObjectType()
export class EnginePage0 extends Page {}
@ObjectType()
export class EnginePage1 extends Page {}
@ObjectType()
export class EnginePage2 extends Page {}
@ObjectType()
export class EnginePage3 extends Page {}
@ObjectType()
export class EnginePage4 extends Page {}
@ObjectType()
export class EnginePage5 extends Page {}
@ObjectType()
export class EnginePage6 extends Page {}
@ObjectType()
export class EnginePage7 extends Page {}
@ObjectType()
export class EnginePage8 extends Page {}
@ObjectType()
export class EnginePage9 extends Page {}
@ObjectType()
export class EnginePage10 extends Page {}
@ObjectType()
export class EnginePage11 extends Page {}
@ObjectType()
export class EnginePage12 extends Page {}

@ObjectType()
export class ListPage extends RelayTypes<Page>(Page) {}
