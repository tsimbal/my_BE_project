import { Document, Types } from 'mongoose';

export interface ITask extends Document {
  description: string;
  title: string;
  status: string;
  completedDate: Date;
  owner?: Types.ObjectId | undefined;
}
