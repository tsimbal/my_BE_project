import { createError } from '../../helpers/index.js';

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = { user: 'test', id };

  if (!result) throw createError(404, 'Not found');

  res.json({ message: 'contact deleted' });
};

export default removeById;
