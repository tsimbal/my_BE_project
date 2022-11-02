const getById = async (req, res) => {
  const result = req.body;

  res.status(201).json(result);
};

export default getById;
