import Product from '../../models/Product.js';
import errorService from '../../service/error-service.js';

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id });

    if (!product) {
      return errorService.badRequest(res, 'Product not found');
    }

    return res.status(200).json({ statusCode: 200, data: product });
  } catch (error) {
    errorService.serverError(res, error);
  }
};

export default getProduct;
