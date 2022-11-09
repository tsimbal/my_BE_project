import Task from '../../models/Task.js';
import errorService from '../../service/error-service.js';

const createTask = async (req, res) => {
  try {
    const newTask = {
      name: req.body.name,
      description: req.body.description,
      category_id: req.body.category_id,
      price: req.body.price,
      currency: req.body.currency,
      is_in_stock: req.body.is_in_stock,
    };
    const result = await Task.create(newTask);

    if (!result) {
      return errorService.badRequest(res, 'Task not created');
    }

    res
      .status(201)
      .json({ statusCode: 201, data: result, message: 'Task created' });
  } catch (error) {
    errorService.serverError(res, error);
  }
};

export default createTask;
