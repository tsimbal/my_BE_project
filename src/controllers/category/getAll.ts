import { Request, Response } from 'express';
import Category from '../../models/Category.model.js';
import errorService from '../../service/error-service.js';

const getCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categories = await Category.find();

  if (!categories.length) {
    return errorService.badRequest(res, 'Category not found');
  }

  return res.status(200).json({ statusCode: 200, data: categories });
};

export default getCategories;
