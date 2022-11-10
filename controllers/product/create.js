import Product from '../../models/Product.model.js';
import errorService from '../../service/error-service.js';

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
    if (!result) {
      return errorService.badRequest(res, 'Product not created');
    }

    res
      .status(201)
      .json({ statusCode: 201, data: result, message: 'Product created' });
  } catch (error) {
    errorService.serverError(res, error);
  }
};

export default createProduct;
