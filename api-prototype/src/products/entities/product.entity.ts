import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ValidProductStatus } from '../interfaces';

@Schema()
export class Product {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  shortDescription: string;

  @Prop({ type: String })
  tags: string[];

  @Prop({ type: String })
  lifeStyle: string;

  @Prop({ type: String, unique: true })
  SKU: string;

  @Prop({ type: String, unique: true})
  slug: string

  // Todo image field
  // Todo category, subcategory and departement fields

  @Prop({ type: String, default: ValidProductStatus.Draft, enum:ValidProductStatus })
  status: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
