import User from '../../models/User.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import mailService from '../../service/mail-service.js';
import tokenService from '../../service/token-service.js';
import userDto from '../../dto/user-dto.js';

const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return errorService.badRequest(res, 'Incorrect data', errors.array());
    }

    const { email, password } = req.body;

    const candidate = await User.findOne({ email });

    if (candidate) {
      return errorService.badRequest(res, 'User is exist');
    }

    const activationLink = uuidv4();

    const hashPassword = await bcrypt.hash(password, 3);
    const user = await User.create({
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
      sameSite: 'None',
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
  } catch (e) {
    errorService.serverError(res, e);
  }
};

export default register;
