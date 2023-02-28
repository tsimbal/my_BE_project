import { IUser } from './../../types/user/IUserDto';
import User from '../../models/User.model';
import bcrypt from 'bcryptjs';
import errorService from '../../service/error-service';
import { Request, Response } from 'express';
import userDto from '../../dto/user-dto';

const updatePassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { oldPassword, newPassword } = req.body;

  const user: IUser | null = await User.findOne({
    //@ts-ignore
    _id: req.user.id,
  });
  if (!user) {
    return errorService.badRequest(res, 'User not found');
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return errorService.badRequest(res, 'Incorrect old password');
  }

  const hashPassword = await bcrypt.hash(newPassword, 3);
  const updatedUser: IUser | null = await User.findOneAndUpdate(
    //@ts-ignore
    { _id: req.user.id },
    { password: hashPassword },
    {
      new: true,
    }
  );

  if (!updatedUser) {
    return errorService.badRequest(res, 'Password not updated');
  }

  const data = userDto.removeUserPassword(updatedUser);
  return res.status(200).json({
    statusCode: 200,
    message: 'Password was successfully updated',
    data: { ...data },
  });
};

export default updatePassword;
