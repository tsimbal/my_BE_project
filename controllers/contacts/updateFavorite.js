import Contact from '../../models/Contacts.js';
import { createError } from '../../helpers/index.js';

const updateFavorite = async (req, res) => {
  const { id } = req.params;

  if (!Object.keys(req.body).length)
    return res.status(400).json({ message: 'missing field favorite' });

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) throw createError(404, 'Not found');

  res.json(result);
};

export default updateFavorite;
