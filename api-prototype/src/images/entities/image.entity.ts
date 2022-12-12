import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Image extends Document {
  @Prop({ type: String })
  title: string;
  @Prop({ type: String })
  url: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
