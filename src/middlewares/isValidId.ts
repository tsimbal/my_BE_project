import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import { createError } from '../helpers/index';

const { isValidObjectId } = mongoose;

const isValidId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(createError(400, `${id} is not valid id format`));
  }
  next();
};

export default isValidId;
