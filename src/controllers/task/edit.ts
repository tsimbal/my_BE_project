import { Response, Request } from 'express';
import Task from '../../models/Task.model';
import errorService from '../../service/error-service';

const editTask = async (req: Request, res: Response): Promise<Response> => {
  const newTask = req.body;

  const task = await Task.findByIdAndUpdate({ _id: req.params.id }, newTask, {
    new: true,
  });
  if (!task) {
    return errorService.badRequest(res, 'Task not updated');
  }

  return res
    .status(200)
    .json({ statusCode: 200, message: 'Task was updated', data: task });
};

export default editTask;
