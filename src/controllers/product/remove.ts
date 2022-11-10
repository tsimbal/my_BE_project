import { IParam } from './../../types/product/IProduct';
import { Request, Response } from 'express';
import Product from '../../models/Product.model.js';
import errorService from '../../service/error-service.js';

const removeProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params as unknown as IParam;
  const product = await Product.remove({ _id: id });

  if (!product) {
    return errorService.badRequest(res, 'Product not removed');
  }

  return res
    .status(200)
    .json({ statusCode: 200, message: 'Product was removed' });
};

export default removeProduct;
