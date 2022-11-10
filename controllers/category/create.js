import Category from '../../models/Category.model.js';
import { faker } from '@faker-js/faker';
import errorService from '../../service/error-service.js';

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
    errorService.serverError(res, error);
  }
};

export default createCategory;
