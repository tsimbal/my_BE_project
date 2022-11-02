import User from '../../models/user.js';

const edit = async (req, res) => {
  try {
    const newUser = req.body;

    const user = await User.findOneAndUpdate({ _id: req.params.id }, params, {
      new: true,
    });

    if (!user)
      return res
        .status(400)
        .json({ statusCode: 400, message: 'User not updated' });

    return res.status(200).json({ statusCode: 200, data: { ...user } });
  } catch (error) {
    errorHandler(res, error);
  }
};

export default edit;
