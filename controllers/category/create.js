import Category from '../../models/category.js';
import errorHandler from '../../utils/errorHandler.js';
import { faker } from '@faker-js/faker';

const createCategory = async (req, res) => {
  try {
    const newCategory = {
      name: faker.commerce.department(),
      description: faker.commerce.productName(),
      image_url: faker.image.business(),
    };
    const result = await Category.create(newCategory);

    res
      .status(201)
      .json({ statusCode: 201, data: result, message: 'Category created' });
  } catch (error) {
    errorHandler(res, error);
  }
};

export default createCategory;
