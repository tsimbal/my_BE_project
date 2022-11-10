import Product from '../../models/Product.model.js';
import errorService from '../../service/error-service.js';

const removeProduct = async (req, res) => {
  try {
    const product = await Product.remove({ _id: req.params.id });

    if (!product) {
      return errorService.badRequest(res, 'Product not removed');
    }

    return res
      .status(200)
      .json({ statusCode: 200, message: 'Product was removed' });
  } catch (error) {
    errorService.serverError(res, error);
  }
};

export default removeProduct;
