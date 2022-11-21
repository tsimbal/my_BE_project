import { Request, Response } from 'express';
import Product from '../../models/Product.model';
import errorService from '../../service/error-service';

const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newProduct = req.body;

  const result = await Product.create(newProduct);
  if (!result) {
    return errorService.badRequest(res, 'Product not created');
  }

  return res
    .status(201)
    .json({ statusCode: 201, data: result, message: 'Product created' });
};

export default createProduct;
