import { Request, Response } from 'express';

const getTest = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({ statusCode: 200, message: 'Hello world' });
};

export default getTest;
