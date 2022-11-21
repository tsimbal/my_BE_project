import Category from '../../models/Category.model.js';
import { faker } from '@faker-js/faker';
import errorService from '../../service/error-service.js';
import { Request, Response } from 'express';

const createCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newCategory = {
    name: faker.commerce.department(),
    description: faker.commerce.productName(),
    image_url: faker.image.business(),
  };
  const result = await Category.create(newCategory);
  if (!result) {
    return errorService.badRequest(res, 'Category not created');
  }

  return res
    .status(201)
    .json({ statusCode: 201, data: result, message: 'Category created' });
};

export default createCategory;
