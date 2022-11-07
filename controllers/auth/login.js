import User from '../../models/user.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import errorHandler from '../../utils/errorHandler.js';
import tokenService from '../../service/token-service.js';
import userDto from '../../dto/user-dto.js';

const login = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        statusCode: 400,
        errors: errors.array(),
        message: 'incorrect data',
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ statusCode: 400, message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ statusCode: 400, message: 'incorrect password' });

    const userData = userDto.generateUserDto(user);
    const tokens = tokenService.generateToken({ ...userData });

    await tokenService.saveToken(userData.id, tokens.refresh_token);

    res.cookie('refreshToken', tokens.refresh_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json({
      statusCode: 200,
      ...tokens,
      data: {
        userData,
      },
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export default login;
