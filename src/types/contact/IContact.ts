import { Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  phone: string;
  favorite: boolean;
  email?: string | undefined;
}
