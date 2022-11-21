import { Request, Response } from 'express';
import Product from '../../models/Product.model';
import errorService from '../../service/error-service';
import { IParam } from '../../types/product/IProduct';

const getProduct = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params as unknown as IParam;

  const product = await Product.findById({ _id: id });
  if (!product) {
    return errorService.badRequest(res, 'Product not found');
  }

  return res.status(200).json({ statusCode: 200, data: product });
};

export default getProduct;
