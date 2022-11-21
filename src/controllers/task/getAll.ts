import { Request, Response } from 'express';
import Task from '../../models/Task.model';
import errorService from '../../service/error-service';

const getAllTasks = async (req: Request, res: Response): Promise<Response> => {
  const tasks = await Task.find();
  if (!tasks.length) {
    return errorService.badRequest(res, 'Tasks not found');
  }

  return res.status(200).json({ statusCode: 200, data: tasks });
};

export default getAllTasks;
