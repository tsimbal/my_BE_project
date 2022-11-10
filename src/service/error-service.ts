import { Response } from 'express';

export default {
  unauthorized(res: Response) {
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthorized',
      timestamps: Date.now(),
    });
  },
  badRequest(res: Response, message: string, error: object[] | null = null) {
    return res.status(400).json({
      statusCode: 400,
      message,
      error,
    });
  },
  serverError(res: Response, error: Error) {
    return res.status(500).json({
      statusCode: 500,
      message: error.message || error,
    });
  },
};
