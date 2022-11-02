import { createError } from '../../helpers/index.js';

const getById = async (req, res) => {
  const { id } = req.params;
  const result = { user: 'test', id };

  if (!result) throw createError(404, 'Not found');

  res.json(result);
};

export default getById;
