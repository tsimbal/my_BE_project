import Category from '../../models/category.js';
import errorHandler from '../../utils/errorHandler.js';

const removeProduct = async (req, res) => {
  try {
    const category = await Category.remove({ _id: req.params.id });

    if (!category)
      return res
        .status(400)
        .json({ statusCode: 400, message: 'Category not removed' });

    return res
      .status(200)
      .json({ statusCode: 200, message: 'Category was removed' });
  } catch (error) {
    errorHandler(res, error);
  }
};

export default removeProduct;
