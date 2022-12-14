import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `${process.env.DB_CONNECTION_STRING}/${process.env.DB_NAME}`,
    ),
    ProductsModule,
    CategoriesModule,
    ImagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
