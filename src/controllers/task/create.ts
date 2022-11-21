import { Response, Request } from 'express';
import Task from '../../models/Task.model';
import errorService from '../../service/error-service';

const createTask = async (req: Request, res: Response): Promise<Response> => {
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

  return res
    .status(201)
    .json({ statusCode: 201, data: result, message: 'Task created' });
};

export default createTask;
