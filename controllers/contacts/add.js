import Contact from '../../models/Contacts.js';

const getById = async (req, res) => {
  const result = await Contact.create(req.body);

  res.status(201).json(result);
};

export default getById;
