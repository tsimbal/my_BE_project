import Product from '../../models/product.js';
import errorHandler from '../../utils/errorHandler.js';

const editProduct = async (req, res) => {
  try {
    const newProduct = req.body;

    const product = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      newProduct,
      { new: true }
    );

    if (!product)
      return res
        .status(400)
        .json({ statusCode: 400, message: 'Product not updated' });

    return res
      .status(200)
      .json({ statusCode: 200, message: 'Product was updated' });
  } catch (error) {
    errorHandler(res, error);
  }
};

export default editProduct;
