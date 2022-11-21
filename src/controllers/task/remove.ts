import { Response, Request } from 'express';
import Task from '../../models/Task.model';
import errorService from '../../service/error-service';

const removeTask = async (req: Request, res: Response): Promise<Response> => {
  const task = await Task.remove({ _id: req.params.id });
  if (!task) {
    return errorService.badRequest(res, 'Task not removed');
  }

  return res.status(200).json({ statusCode: 200, message: 'Task was removed' });
};

export default removeTask;
