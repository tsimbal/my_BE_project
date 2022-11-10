import jwt from 'jsonwebtoken';
import Token from '../models/Token.model.js';

export default {
  generateToken: (data) => {
    const access_token = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: '15s',
    });

    const refresh_token = jwt.sign(data, process.env.REFRESH_JWT_SECRET, {
      expiresIn: '30d',
    });

    return {
      access_token,
      refresh_token,
    };
  },

  saveToken: async (userId, refreshToken) => {
    const tokenData = await Token.findOne({ user: userId });

    if (tokenData) {
      tokenData.refresh_token = refreshToken;

      return await tokenData.save();
    }

    const token = await Token.create({
      user: userId,
      refresh_token: refreshToken,
    });

    return token;
  },

  validateAccessToken: (token) => {
    try {
      const userData = jwt.verify(token, process.env.JWT_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  },

  validateRefreshToken: (token) => {
    try {
      const userData = jwt.verify(token, process.env.REFRESH_JWT_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  },
};
