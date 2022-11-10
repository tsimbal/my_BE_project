import { JwtPayload } from 'jsonwebtoken';
import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  _id: string;
  isActivated: boolean;
  name: string;
  surname: string;
  sex: number;
  birthday: string;
  city: string;
  zip: string;
  country: string;
  address: string;
  avatar: string;
  phone: string;
  password: string;
  activationLink?: string | undefined;
}

export interface IUserDto extends JwtPayload {
  email: string;
  id: string;
  isActivated: boolean;
}
