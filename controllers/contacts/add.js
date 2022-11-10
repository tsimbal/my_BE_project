import Contact from '../../models/Contact.model.js';

const getById = async (req, res) => {
  const result = await Contact.create(req.body);

  res.status(201).json(result);
};

export default getById;
