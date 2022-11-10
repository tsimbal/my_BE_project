import User from '../../models/User.model';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import tokenService from '../../service/token-service';
import userDto from '../../dto/user-dto';
import errorService from '../../service/error-service';
import { Request, Response } from 'express';

const login = async (req: Request, res: Response): Promise<Response> => {
  console.log(req.body);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return errorService.badRequest(res, 'Incorrect data', errors.array());
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return errorService.badRequest(res, 'User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return errorService.badRequest(res, 'incorrect password');
  }

  const userData = userDto.generateUserDto(user);
  const tokens = tokenService.generateToken({ ...userData });

  await tokenService.saveToken(userData.id, tokens.refresh_token);

  res.cookie('refresh_token', tokens.refresh_token, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });

  return res.status(200).json({
    statusCode: 200,
    ...tokens,
    data: {
      userData,
    },
  });
};

export default login;
