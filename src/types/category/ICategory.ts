import { Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description: string;
  category_id: number;
  image_url: string;
  tags?: any[];
}
