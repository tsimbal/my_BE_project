import Product from '../../models/Product.model.js';
import errorService from '../../service/error-service.js';

const editProduct = async (req, res) => {
  const newProduct = req.body;

  try {
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
  } catch (error) {
    errorService.serverError(res, error);
  }
};

export default editProduct;
