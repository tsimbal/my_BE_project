import Task from '../../models/Task.js';
import errorService from '../../service/error-service.js';

const removeTask = async (req, res) => {
  try {
    const task = await Task.remove({ _id: req.params.id });

    if (!task) {
      return errorService.badRequest(res, 'Task not removed');
    }

    return res
      .status(200)
      .json({ statusCode: 200, message: 'Task was removed' });
  } catch (error) {
    errorService.serverError(res, error);
  }
};

export default removeTask;
