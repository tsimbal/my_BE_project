import { createError } from '../helpers/index.js';

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(createError(400, `${id} is not valid id format`));
  }
  next();
};

export default isValidId;
