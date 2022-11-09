import Product from '../../models/Product.js';
import errorService from '../../service/error-service.js';

const getAllProducts = async (req, res) => {
  try {
    const pagination = {
      limit: +req.query.limit || 10,
      page: +req.query.page || 1,
    };

    const products = await Product.find();

    if (!products.length) {
      return errorService.badRequest(res, 'Products not found');
    }

    return res.status(200).json({
      statusCode: 200,
      data: newProd,
      totalRows: products.length,
      limit: pagination.limit,
    });
  } catch (error) {
    errorService.serverError(res, error);
  }
};

export default getAllProducts;
