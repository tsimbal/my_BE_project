import User from '../../models/User.model.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import tokenService from '../../service/token-service.js';
import userDto from '../../dto/user-dto.js';
import errorService from '../../service/error-service.js';

const login = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return error.badRequest('Incorrect data', errors.array());
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
      sameSite: 'None',
      secure: true,
    });

    return res.status(200).json({
      statusCode: 200,
      ...tokens,
      data: {
        userData,
      },
    });
  } catch (e) {
    errorService.serverError(res, e);
  }
};

export default login;
