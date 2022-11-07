import { createError } from '../../helpers/index.js';
import Contact from '../../models/contacts.js';

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);

  if (!result) throw createError(404, 'Not found');

  res.json(result);
};

export default getById;
