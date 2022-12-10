import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { handleErrors } from 'src/common/helpers';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { ValidCategoriesStatus } from './interfaces/valid-categories-status.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.categoryModel.create(createCategoryDto);
      return category;
    } catch (error) {
      handleErrors(error);
    }
  }

  async findAll() {
    return await this.categoryModel.find({
      status: { $ne: ValidCategoriesStatus.Archived },
    });
  }

  async findOne(id: string) {
    if (!isValidObjectId(id))
      throw new BadRequestException(`${id} is not a valid ID`);

    const category = await this.categoryModel.findById(id);

    if (!category)
      throw new NotFoundException(`Category not found with ID ${id}`);

    return await this.categoryModel.findById(id);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category: Category = await this.findOne(id);

    try {
      await category.updateOne(updateCategoryDto);
    } catch (error) {
      handleErrors(error);
    }

    return category;
  }

  async remove(id: string) {
    const category: Category = await this.findOne(id);
    category.status = ValidCategoriesStatus.Archived;

    try {
      await category.save();
    } catch (error) {
      handleErrors(error);
    }
  }
}
