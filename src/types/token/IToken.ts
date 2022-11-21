import { Document, Types } from 'mongoose';

export interface IToken extends Document {
  refresh_token: string;
  user?: Types.ObjectId | undefined;
}
