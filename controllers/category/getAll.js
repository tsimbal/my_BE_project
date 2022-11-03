import Category from '../../models/category.js';
import errorHandler from '../../utils/errorHandler.js';

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    if (!categories.length)
      return res
        .status(400)
        .json({ statusCode: 400, message: 'Category not found' });

    return res.status(200).json({ statusCode: 200, data: categories });
  } catch (error) {
    errorHandler(res, error);
  }
};

export default getCategories;
