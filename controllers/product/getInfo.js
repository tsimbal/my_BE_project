import Product from '../../models/product.js';
import errorHandler from '../../utils/errorHandler.js';

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id });

    if (!product)
      return res
        .status(400)
        .json({ statusCode: 400, message: 'Product not found' });

    return res.status(200).json({ statusCode: 200, data: product });
  } catch (error) {
    errorHandler(res, error);
  }
};

export default getProduct;
