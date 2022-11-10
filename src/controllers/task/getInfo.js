import Task from '../../models/Task.js';
import errorService from '../../service/error-service.js';

const getTask = async (req, res) => {
  try {
    const task = await Task.findById({ _id: req.params.id });

    if (!task) {
      return errorService.badRequest(res, 'Task not updated');
    }

    return res.status(200).json({ statusCode: 200, data: task });
  } catch (error) {
    errorService.serverError(res, error);
  }
};

export default getTask;
