import { Request, Response } from 'express';
import cc from 'currency-codes';

const getAllCurrency = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const list = cc.country('Ukraine');

  return res.status(200).json({
    statusCode: 200,
    data: list,
  });
};

export default getAllCurrency;
