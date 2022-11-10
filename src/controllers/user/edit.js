import User from '../../models/User.model.js';
import errorService from '../../service/error-service.js';

const edit = async (req, res) => {
  try {
    const newUser = req.body;

    const user = await User.findOneAndUpdate({ _id: req.params.id }, newUser, {
      new: true,
    });

    if (!user) {
      return errorService.badRequest(res, 'User not updated');
    }

    const { ...foundUser } = user;
    const { password, ...data } = foundUser['_doc'];

    return res.status(200).json({ statusCode: 200, data });
  } catch (error) {
    errorService.serverError(res, error);
  }
};

export default edit;
