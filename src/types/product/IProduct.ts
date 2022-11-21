import { Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  category_id: number;
  image_url: string;
  is_in_stock: boolean;
  is_popular: boolean;
  price?: {
    amount: number;
    is_discount: boolean;
    discount_percent: number;
    discount_price: number;
  };
  currency?: {
    name: string;
    id: number;
  };
}

export interface IParam {
  id: string;
}
