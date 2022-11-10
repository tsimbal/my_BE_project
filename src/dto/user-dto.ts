import { IUser, IUserDto } from './../types/user/IUserDto';

export default {
  generateUserDto(userModel: IUser | any): IUserDto {
    return {
      email: userModel.email,
      id: userModel._id,
      isActivated: userModel.isActivated,
    };
  },
};
