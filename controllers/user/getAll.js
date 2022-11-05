import User from '../../models/user.js';
import errorHandler from '../../utils/errorHandler.js';

const getAll = async (req, res) => {
  try {
    const user = await User.find();

    if (!user)
      return res
        .status(400)
        .json({ statusCode: 400, message: 'user not found' });

    return res.status(200).json({ statusCode: 200, user });
  } catch (error) {
    errorHandler(res, error);
  }
};

export default getAll;
