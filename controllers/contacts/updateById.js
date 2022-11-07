import Contact from '../../models/contacts.js';
import { createError } from '../../helpers/index.js';

const getById = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const bodyKeys = Object.keys(body);
  const requiredFields = ['name', 'email', 'phone'];
  const isNotExistFields = requiredFields.filter(
    (key) => !bodyKeys.includes(key)
  );
  let result = null;

  if (!isNotExistFields.length)
    result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  else
    return res
      .status(400)
      .json({ message: `missing required ${isNotExistFields} field` });

  if (!result) throw createError(404, 'Not found');

  res.json(result);
};

export default getById;
