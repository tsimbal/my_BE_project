import { Request, Response } from 'express';
import Category from '../../models/Category.model.js';
import errorService from '../../service/error-service.js';

const removeProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const category = await Category.remove({ _id: req.params.id });

  if (!category) {
    return errorService.badRequest(res, 'Category not removed');
  }

  return res
    .status(200)
    .json({ statusCode: 200, message: 'Category was removed' });
};

export default removeProduct;
