import Category from '../../models/category.js';
import Product from '../../models/product.js';
import errorHandler from '../../utils/errorHandler.js';

const getAllProducts = async (req, res) => {
  try {
    const pagination = {
      limit: +req.query.limit || 10,
      page: +req.query.page || 1,
    };

    const products = await Category.find();

    if (!products.length)
      return res
        .status(400)
        .json({ statusCode: 400, message: 'Products not found' });

    const newProd = [];
    for (let i = 0; i < 1000; i++) {
      newProd.push(...products);
    }

    return res.status(200).json({
      statusCode: 200,
      data: newProd,
      totalRows: products.length,
      limit: pagination.limit,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export default getAllProducts;
