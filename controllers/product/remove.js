import Product from '../../models/product.js';
import errorHandler from '../../utils/errorHandler.js';

const removeProduct = async (req, res) => {
  try {
    const product = await Product.remove({ _id: req.params.id });

    if (!product)
      return res
        .status(400)
        .json({ statusCode: 400, message: 'Product not removed' });

    return res
      .status(200)
      .json({ statusCode: 200, message: 'Product was removed' });
  } catch (error) {
    errorHandler(res, error);
  }
};

export default removeProduct;
