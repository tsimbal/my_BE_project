import cc from 'currency-codes';

const getAllCurrency = (req, res) => {
  const list = cc.country('Ukraine');

  res.status(200).json({
    statusCode: 200,
    data: list,
  });
};

export default getAllCurrency;
