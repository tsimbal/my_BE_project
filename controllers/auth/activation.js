import User from '../../models/User.js';
import errorService from '../../service/error-service.js';

const activate = async (req, res) => {
  const { link } = req.params;

  const user = await User.findOne({ activationLink: link });
  if (!user) {
    return errorService.badRequest(res, 'User with link not found');
  }

  user.isActivated = true;

  await user.save();

  return res.status(200).json({
    statusCode: 200,
    message: 'User is confirm',
  });
};

export default activate;
