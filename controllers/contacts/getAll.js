const getAll = async (req, res) => {
  const result = [1, 2, 3, 4, 5];

  res.json(result);
};

export default getAll;
