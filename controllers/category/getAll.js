import Category from '../../models/Category.js';
import errorService from '../../service/error-service.js';

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    if (!categories.length) {
      return errorService.badRequest(res, 'Category not found');
    }

    return res.status(200).json({ statusCode: 200, data: categories });
  } catch (error) {
    errorService.serverError(res, error);
  }
};

export default getCategories;
