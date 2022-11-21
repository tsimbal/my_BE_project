import { IUser, IUserDto } from './../types/user/IUserDto';

export default {
  generateUserDto(userModel: IUser | any): IUserDto {
    return {
      email: userModel.email,
      id: userModel._id,
      isActivated: userModel.isActivated,
    };
  },
  removeUserPassword(userModel: IUser | any): {
    birthday: any;
    zip: any;
    country: any;
    address: any;
    city: any;
    sex: any;
    isActivated: any;
    avatar: any;
    activationLink: any;
    phone: any;
    surname: any;
    name: any;
    _id: any;
    email: any;
  } {
    return userModel
      ? {
          email: userModel.email,
          _id: userModel._id,
          isActivated: userModel.isActivated,
          name: userModel.name,
          surname: userModel.surname,
          sex: userModel.sex,
          birthday: userModel.birthday,
          city: userModel.city,
          zip: userModel.zip,
          country: userModel.country,
          address: userModel.address,
          avatar: userModel.avatar,
          phone: userModel.phone,
          activationLink: userModel.activationLink,
        }
      : {
          email: '',
          _id: ' userModel._id',
          isActivated: false,
          name: '',
          surname: '',
          sex: 0,
          birthday: '',
          city: '',
          zip: '',
          country: '',
          address: '',
          avatar: '',
          phone: '',
          activationLink: '',
        };
  },
};
