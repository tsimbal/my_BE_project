import User from '../../models/User.model.js';
import errorService from '../../service/error-service.js';

const getAll = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return errorService.badRequest(res, 'User not updated');
    }

    return res.status(200).json({ statusCode: 200, data: users });
  } catch (error) {
    errorService.serverError(res, error);
  }
};

export default getAll;
