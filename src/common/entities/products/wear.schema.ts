// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { AbstractDocument } from 'src/common/abstract/abstract.schema';
// import { DataProduct } from './wear.model';

// @Schema({ versionKey: false })
// export class WearDocument extends AbstractDocument {
//   @Prop({ type: DataProduct })
//   dataWear: DataProduct;

//   @Prop({ trim: true })
//   slug: string;

//   @Prop({ trim: true })
//   siteId: string;

//   @Prop({ trim: true })
//   parentId: string;
// }

// export const ClothingProductSchema = SchemaFactory.createForClass(WearDocument);
// export const BackpackProductSchema = SchemaFactory.createForClass(WearDocument);
// export const HandbagProductSchema = SchemaFactory.createForClass(WearDocument);

// @Schema({ versionKey: false })
// export class HardwareStoreDocument extends AbstractDocument {
//   @Prop({ type: DataProduct })
//   dataHardwareStore: DataProduct;

//   @Prop({ trim: true })
//   slug: string;

//   @Prop({ trim: true })
//   siteId: string;

//   @Prop({ trim: true })
//   parentId: string;
// }
// export const ToolProductSchema = SchemaFactory.createForClass(
//   HardwareStoreDocument,
// );
// // export const FurnitureSchema = SchemaFactory.createForClass(WearDocument);

// // export const HardwareStoreSchema = SchemaFactory.createForClass(WearDocument);

// // export const GlassesSchema = SchemaFactory.createForClass(WearDocument);
// // export const EngineSchema = SchemaFactory.createForClass(WearDocument);
