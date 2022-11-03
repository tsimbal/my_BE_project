import User from '../../models/user.js';
import errorHandler from '../../utils/errorHandler.js';

const edit = async (req, res) => {
  try {
    const newUser = req.body;

    const user = await User.findOneAndUpdate({ _id: req.params.id }, newUser, {
      new: true,
    });

    if (!user)
      return res
        .status(400)
        .json({ statusCode: 400, message: 'User not updated' });

    const { ...foundUser } = user;
    const { password, ...data } = foundUser['_doc'];

    return res.status(200).json({ statusCode: 200, data });
  } catch (error) {
    errorHandler(res, error);
  }
};

export default edit;
