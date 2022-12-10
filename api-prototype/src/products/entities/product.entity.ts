import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ValidProductStatus } from '../interfaces';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ type: String, required: true, index: true })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  shortDescription: string;

  @Prop({ type: String, index: true })
  tags: string[];

  @Prop({ type: String })
  lifeStyle: string;

  @Prop({ type: String, unique: true, index: true })
  SKU: string;

  @Prop({ type: String, unique: true, index: true })
  slug: string;

  // Todo image field
  // Todo category, subcategory and departement fields

  @Prop({
    type: String,
    default: ValidProductStatus.Draft,
    enum: ValidProductStatus,
  })
  status: ValidProductStatus;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
