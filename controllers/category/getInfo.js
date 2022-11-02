import Category from '../../models/category.js';
import errorHandler from '../../utils/errorHandler.js';

const getCategory = async (req, res) => {
  try {
    const category = await Category.findById({ _id: req.params.id });

    if (!category)
      return res
        .status(400)
        .json({ statusCode: 400, message: 'Category not found' });

    return res.status(200).json({ statusCode: 200, data: category });
  } catch (error) {
    errorHandler(res, error);
  }
};

export default getCategory;
