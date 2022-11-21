import { Request } from 'express';
export interface IReqWithPagination {
  limit: number;
  page: number;
}

export interface IReqUser extends Request {
  user: {
    id: string;
  };
}
