import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ValidCategoriesStatus } from '../interfaces/valid-categories-status.interface';

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ type: String })
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  parent?: string;

  @Prop({ type: String })
  image?: string;

  @Prop({
    type: String,
    enum: ValidCategoriesStatus,
    default: ValidCategoriesStatus.Draft,
  })
  status?: ValidCategoriesStatus;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
