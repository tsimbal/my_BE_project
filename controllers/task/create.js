import Product from '../../models/product.js';
import errorHandler from '../../utils/errorHandler.js';

const createProduct = async (req, res) => {
  try {
    const newProduct = {
      name: req.body.name,
      description: req.body.description,
      category_id: req.body.category_id,
      price: req.body.price,
      currency: req.body.currency,
      is_in_stock: req.body.is_in_stock,
    };
    const result = await Product.create(newProduct);

    res
      .status(201)
      .json({ statusCode: 201, data: result, message: 'Product created' });
  } catch (error) {
    errorHandler(res, error);
  }
};

export default createProduct;
