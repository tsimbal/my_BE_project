import User from '../../models/User.model.js';
import errorService from '../../service/error-service.js';

const info = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    if (!user) {
      return errorService.badRequest(res, 'User not found');
    }

    const { ...foundUser } = user;
    const { password, ...data } = foundUser['_doc'];

    return res.status(200).json({ statusCode: 200, data });
  } catch (error) {
    errorService.serverError(res, error);
  }
};

export default info;
