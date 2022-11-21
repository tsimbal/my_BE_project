import { Request, Response } from 'express';
import Product from '../../models/Product.model.js';
import errorService from '../../service/error-service.js';

const editProduct = async (req: Request, res: Response): Promise<Response> => {
  const newProduct = req.body;

  const product = await Product.findByIdAndUpdate(
    { _id: req.params.id },
    newProduct,
    { new: true }
  );

  if (!product) {
    return errorService.badRequest(res, 'Product not updated');
  }

  return res
    .status(200)
    .json({ statusCode: 200, message: 'Product was updated', data: product });
};

export default editProduct;
