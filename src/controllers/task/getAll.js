import Task from '../../models/Task.js';
import errorService from '../../service/error-service.js';

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().paginate(
      {},
      {
        page: 1,
        limit: 5,
      }
    );

    if (!tasks.length) {
      return errorService.badRequest(res, 'Tasks not found');
    }

    return res.status(200).json({ statusCode: 200, data: tasks });
  } catch (error) {
    errorService.serverError(res, error);
  }
};

export default getAllTasks;
