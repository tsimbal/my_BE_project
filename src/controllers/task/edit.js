import Task from '../../models/Task.js';
import errorService from '../../service/error-service.js';

const editTask = async (req, res) => {
  try {
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
  } catch (error) {
    errorService.serverError(res, error);
  }
};

export default editTask;
