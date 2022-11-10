import User from '../../models/User.model';
import errorService from '../../service/error-service';
import { Request, Response } from 'express';
import userDto from '../../dto/user-dto';

const getAll = async (req: Request, res: Response): Promise<Response> => {
  const users = await User.find();

  if (!users) {
    return errorService.badRequest(res, 'User not found');
  }

  const updatedUsers = users.reduce((acc, el): any => {
    return [...acc, userDto.removeUserPassword(el)];
  }, []);

  return res.status(200).json({ statusCode: 200, data: updatedUsers });
};

export default getAll;
