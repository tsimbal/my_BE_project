import User from '../../models/user.js';

const activate = async (req, res) => {
  const { link } = req.params;

  const user = await User.findOne({ activationLink: link });
  if (!user) {
    return res
      .status(400)
      .json({ statusCode: 400, message: 'User with link not found' });
  }

  user.isActivated = true;

  await user.save();

  return res.status(200).json({
    statusCode: 200,
    message: 'User is confirm',
  });
};

export default activate;
