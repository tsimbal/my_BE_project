import Token from '../../models/Token.model.js';

const logout = async (req, res) => {
  const { refreshToken } = req.cookies;

  const token = await Token.deleteOne({ refresh_token: refreshToken });

  res.clearCookie('refreshToken');

  return res.status(200).json({
    statusCode: 200,
    message: 'Success logout',
  });
};

export default logout;
