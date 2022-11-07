import userDto from '../../dto/user-dto.js';
import Token from '../../models/Token.js';
import User from '../../models/user.js';
import tokenService from '../../service/token-service.js';

const refresh = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthorized',
      timestamps: Date.now(),
    });
  }

  const userData = tokenService.validateRefreshToken(refreshToken);
  const tokenFromDb = await Token.findOne({ refresh_token: refreshToken });

  if (!userData || !tokenFromDb) {
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthorized',
      timestamps: Date.now(),
    });
  }

  const user = await User.findById(userData.id);

  const userFromDto = userDto.generateUserDto(user);
  const tokens = tokenService.generateToken({ ...userFromDto });

  await tokenService.saveToken(userFromDto.id, tokens.refresh_token);

  res.cookie('refreshToken', tokens.refresh_token, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  return res.status(200).json({
    statusCode: 200,
    ...tokens,
    data: {
      userFromDto,
    },
  });
};

export default refresh;
