import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { handleErrors } from 'src/common/helpers';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image.name) private readonly imageSchema: Model<Image>,
  ) {}

  async create(createImageDto: CreateImageDto) {
    try {
      const image = await this.imageSchema.create(createImageDto);
      return image;
    } catch (error) {
      handleErrors(error);
    }
  }

  async findAll() {
    return await this.imageSchema.find({});
  }

  async findOne(id: string) {
    if (!isValidObjectId(id))
      throw new BadRequestException(`${id} is not a valid ID`);

    const image = await this.imageSchema.findById(id);

    if (!image) throw new NotFoundException(`Image with id ${id} not found`);

    return image;
  }

  async update(id: string, updateImageDto: UpdateImageDto) {
    const image = await this.findOne(id);

    try {
      await image.updateOne(updateImageDto);
    } catch (error) {
      handleErrors(error);
    }

    return image;
  }

  // TODO pendding implement delete method

  async remove(id: string) {
    return `This action removes a #${id} image`;
  }
}
