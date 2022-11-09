import Category from '../../models/Category.js';
import errorService from '../../service/error-service.js';

const getCategory = async (req, res) => {
  try {
    const category = await Category.findById({ _id: req.params.id });

    if (!category) {
      return errorService.badRequest(res, 'Category not found');
    }

    return res.status(200).json({ statusCode: 200, data: category });
  } catch (error) {}
};

export default getCategory;
