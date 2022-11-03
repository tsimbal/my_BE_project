import User from '../../models/user.js';

const info = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.user.userId });

    if (!user)
      return res
        .status(400)
        .json({ statusCode: 400, message: 'user not found' });

    const { password, ...foundUser } = user[0].dataValues;

    return res.status(200).json({ statusCode: 200, data: { ...foundUser } });
  } catch (error) {
    errorHandler(res, error);
  }
};

export default info;