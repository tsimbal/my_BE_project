import User from '../../models/user.js';
import errorHandler from '../../utils/errorHandler.js';

const getAll = async (req, res) => {
  try {
    const users = await User.find();

    if (!users)
      return res
        .status(400)
        .json({ statusCode: 400, message: 'users not found' });

    return res.status(200).json({ statusCode: 200, data: users });
  } catch (error) {
    errorHandler(res, error);
  }
};

export default getAll;
