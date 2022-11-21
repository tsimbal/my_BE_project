import { Request, Response } from 'express';
import Category from '../../models/Category.model.js';
import errorService from '../../service/error-service.js';

const getCategory = async (req: Request, res: Response): Promise<Response> => {
  const category = await Category.findById({ _id: req.params.id });

  if (!category) {
    return errorService.badRequest(res, 'Category not found');
  }

  return res.status(200).json({ statusCode: 200, data: category });
};

export default getCategory;
