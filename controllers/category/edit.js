import Category from '../../models/category.js';
import errorHandler from '../../utils/errorHandler.js';

const editCategory = async (req, res) => {
  try {
    const newCategory = req.body;

    const category = await Category.findByIdAndUpdate(
      { _id: req.params.id },
      newCategory,
      { new: true }
    );

    if (!category)
      return res
        .status(400)
        .json({ statusCode: 400, message: 'Category not updated' });

    return res
      .status(200)
      .json({ statusCode: 200, message: 'Category was updated' });
  } catch (error) {
    errorHandler(res, error);
  }
};

export default editCategory;
