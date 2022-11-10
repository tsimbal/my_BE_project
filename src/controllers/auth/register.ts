import User from '../../models/User.model';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import mailService from '../../service/mail-service';
import tokenService from '../../service/token-service';
import userDto from '../../dto/user-dto';
import errorService from '../../service/error-service';
import { Request, Response } from 'express';
import { IUser } from '../../types/user/IUserDto';

const register = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return errorService.badRequest(res, 'Incorrect data', errors.array());
  }

  const { email, password } = req.body;

  const candidate: IUser | null = await User.findOne({ email });

  if (candidate) {
    return errorService.badRequest(res, 'User is exist');
  }

  const activationLink = uuidv4();

  const hashPassword = await bcrypt.hash(password, 3);
  const user: IUser | unknown = await User.create({
    email,
    password: hashPassword,
    activationLink,
  });

  await mailService.sendActivationMail(
    email,
    `${process.env.API_URL}/api/auth/activation/${activationLink}`
  );

  const userData = userDto.generateUserDto(user);
  const tokens = tokenService.generateToken({ ...userData });

  await tokenService.saveToken(userData.id, tokens.refresh_token);

  res.cookie('refresh_token', tokens.refresh_token, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });

  return res.status(201).json({
    statusCode: 201,
    message: 'User created',
    data: {
      userData,
      ...tokens,
    },
  });
};

export default register;
