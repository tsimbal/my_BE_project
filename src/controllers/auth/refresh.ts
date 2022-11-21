import { IUserDto } from './../../types/user/IUserDto';
import { Request, Response } from 'express';
import userDto from '../../dto/user-dto';
import Token from '../../models/Token.model';
import User from '../../models/User.model';
import errorService from '../../service/error-service';
import tokenService from '../../service/token-service';
import { IToken } from '../../types/token/IToken';
import { IUser } from '../../types/user/IUserDto';

const refresh = async (req: Request, res: Response): Promise<Response> => {
  const { refresh_token } = req.cookies;

  if (!refresh_token) {
    return errorService.unauthorized(res);
  }

  const userData: IUserDto = tokenService.validateRefreshToken(refresh_token);
  const tokenFromDb: IToken | null = await Token.findOne({ refresh_token });

  if (!userData || !tokenFromDb) {
    return errorService.unauthorized(res);
  }

  const user: IUser | null = await User.findById(userData.id);

  const userFromDto = userDto.generateUserDto(user);
  const tokens = tokenService.generateToken({ ...userFromDto });

  await tokenService.saveToken(userFromDto.id, tokens.refresh_token);

  res.cookie('refresh_token', tokens.refresh_token, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: false,
    sameSite: 'none',
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
