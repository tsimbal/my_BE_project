import User from '../../models/user.js';
import errorHandler from '../../utils/errorHandler.js';

const info = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.user.userId });

    if (!user)
      return res
        .status(400)
        .json({ statusCode: 400, message: 'user not found' });

    const { ...foundUser } = user;
    const { password, ...data } = foundUser['_doc'];

    return res.status(200).json({ statusCode: 200, data });
  } catch (error) {
    errorHandler(res, error);
  }
};

export default info;
