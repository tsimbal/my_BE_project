import User from '../../models/User.model';
import errorService from '../../service/error-service';
import { Request, Response } from 'express';
import { IUser } from '../../types/user/IUserDto';
import userDto from '../../dto/user-dto';

const edit = async (req: Request, res: Response): Promise<Response> => {
  const newUser = req.body;

  const user: IUser | null = await User.findOneAndUpdate(
    { _id: req.params.id },
    newUser,
    {
      new: true,
    }
  );
  if (!user) {
    return errorService.badRequest(res, 'User not updated');
  }

  const data = userDto.removeUserPassword(user);

  return res.status(200).json({ statusCode: 200, data });
};

export default edit;
