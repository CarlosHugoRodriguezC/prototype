import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export const handleErrors = (error) => {
  if (error.code === 11000)
    throw new BadRequestException(
      `Product already exist ${JSON.stringify(error.keyValue)}`,
    );

  console.log(error);
  throw new InternalServerErrorException(
    `Something went wrong - check server logs`,
  );
};
