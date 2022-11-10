import { IUserDto } from './../types/user/IUserDto';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Token from '../models/Token.model';

export default {
  jwtSecret: process.env.JWT_SECRET as string,
  refreshJwtSecret: process.env.REFRESH_JWT_SECRET as string,

  generateToken(data: object) {
    const access_token = jwt.sign(data, this.jwtSecret, {
      expiresIn: '15s',
    });

    const refresh_token = jwt.sign(data, this.refreshJwtSecret, {
      expiresIn: '30d',
    });

    return {
      access_token,
      refresh_token,
    };
  },

  async saveToken(userId: string, refreshToken: string): Promise<string | any> {
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

  validateAccessToken(token: string): string | object | JwtPayload | null {
    try {
      const userData = jwt.verify(token, this.jwtSecret);

      return userData;
    } catch (e) {
      return null;
    }
  },

  validateRefreshToken(token: string): IUserDto | any {
    try {
      const userData = jwt.verify(token, this.refreshJwtSecret);
      return userData;
    } catch (e) {
      return null;
    }
  },
};
