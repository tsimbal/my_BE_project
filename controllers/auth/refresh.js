import userDto from '../../dto/user-dto.js';
import Token from '../../models/Token.js';
import User from '../../models/User.model.js';
import errorService from '../../service/error-service.js';
import tokenService from '../../service/token-service.js';

const refresh = async (req, res) => {
  const { refresh_token } = req.cookies;

  if (!refresh_token) {
    return errorService.unauthorized(res);
  }

  const userData = tokenService.validateRefreshToken(refresh_token);
  const tokenFromDb = await Token.findOne({ refresh_token });

  if (!userData || !tokenFromDb) {
    return errorService.unauthorized(res);
  }

  const user = await User.findById(userData.id);

  const userFromDto = userDto.generateUserDto(user);
  const tokens = tokenService.generateToken({ ...userFromDto });

  await tokenService.saveToken(userFromDto.id, tokens.refresh_token);

  res.cookie('refresh_token', tokens.refresh_token, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: false,
    sameSite: 'None',
    secure: true,
  });

  return res.status(200).json({
    statusCode: 200,
    ...tokens,
    data: {
      ...userFromDto,
    },
  });
};

export default refresh;
