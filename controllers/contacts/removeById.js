import { createError } from '../../helpers/index.js';
import Contact from '../../models/contacts.js';

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);

  if (!result) throw createError(404, 'Not found');

  res.json({ message: 'contact deleted' });
};

export default removeById;
