import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ValidProductStatus } from './interfaces';
import { handleErrors } from '../common/helpers';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const product = await this.productModel.create(createProductDto);
      return product;
    } catch (error) {
      handleErrors(error)
    }
  }

  async findAll(): Promise<Product[]> {
    const products: Product[] = await this.productModel.find({
      status: { $ne: ValidProductStatus.Archived },
    });
    return products;
  }

  async findOne(id: string): Promise<Product> {
    if (!isValidObjectId(id))
      throw new BadRequestException(`${id} is not a valid ID`);

    const product = await this.productModel.findById(id);

    if (!product)
      throw new NotFoundException(`Product not found with this id ${id}`);

    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product: Product = await this.findOne(id);

    try {
      await product.updateOne(updateProductDto);
    } catch (error) {
      handleErrors(error)
    }

    return product;
  }

  async remove(id: string) {
    const product: Product = await this.findOne(id);
    product.status = ValidProductStatus.Archived;

    try {
      await product.save();
    } catch (error) {
      handleErrors(error)
    }
  }

  
}
