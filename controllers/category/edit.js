import Category from '../../models/Category.js';
import errorService from '../../service/error-service.js';

const editCategory = async (req, res) => {
  try {
    const newCategory = req.body;

    const category = await Category.findByIdAndUpdate(
      { _id: req.params.id },
      newCategory,
      { new: true }
    );

    if (!category) {
      return errorService.badRequest(res, 'Category not updated');
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Category was updated',
      data: category,
    });
  } catch (error) {
    errorService.serverError(res, error);
  }
};

export default editCategory;
