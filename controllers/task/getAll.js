import Product from '../../models/product.js';
import errorHandler from '../../utils/errorHandler.js';

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().paginate(
      {},
      {
        page: 1,
        limit: 5,
      }
    );

    if (!products.length)
      return res
        .status(400)
        .json({ statusCode: 400, message: 'Products not found' });

    console.log(products);
    return res.status(200).json({ statusCode: 200, data: products });
  } catch (error) {
    errorHandler(res, error);
  }
};

export default getAllProducts;
