import { Request, Response } from 'express';
import Product from '../../models/Product.model';
import errorService from '../../service/error-service';
import { IReqWithPagination } from '../../types/server/IQueryPagination';

const getAllProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { limit, page } = req.query as unknown as IReqWithPagination;

  const pagination = {
    limit: +limit || 10,
    page: +page || 1,
  };

  const products = await Product.find();
  if (!products.length) {
    return errorService.badRequest(res, 'Products not found');
  }

  return res.status(200).json({
    statusCode: 200,
    data: products,
    totalRows: products.length,
    limit: pagination.limit,
  });
};

export default getAllProducts;
