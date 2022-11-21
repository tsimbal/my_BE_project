import { Request, Response } from 'express';
import Task from '../../models/Task.model';
import errorService from '../../service/error-service';

const getTask = async (req: Request, res: Response): Promise<Response> => {
  const task = await Task.findById({ _id: req.params.id });
  if (!task) {
    return errorService.badRequest(res, 'Task not updated');
  }

  return res.status(200).json({ statusCode: 200, data: task });
};

export default getTask;
