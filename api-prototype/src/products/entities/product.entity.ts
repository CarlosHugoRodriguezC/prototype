import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from 'src/categories/entities/category.entity';
import { Image } from 'src/images/entities/image.entity';
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

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Image.name })
  images: Image[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Category.name })
  categories:  Category[];

  @Prop({
    type: String,
    default: ValidProductStatus.Draft,
    enum: ValidProductStatus,
  })
  status: ValidProductStatus;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
