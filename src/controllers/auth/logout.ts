import { Request, Response } from 'express';

import Token from '../../models/Token.model';

const logout = async (req: Request, res: Response): Promise<Response> => {
  const { refreshToken } = req.cookies;

  const token = await Token.deleteOne({ refresh_token: refreshToken });

  res.clearCookie('refreshToken');

  return res.status(200).json({
    statusCode: 200,
    message: 'Success logout',
  });
};

export default logout;
