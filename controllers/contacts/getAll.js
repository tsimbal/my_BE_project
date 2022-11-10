import Contact from '../../models/Contacts.js';
import errorService from '../../service/error-service.js';

const getAll = async (req, res) => {
  const result = await Contact.find();
  if (!result) {
    return errorService.badRequest(res, 'Contacts not found');
  }

  res.status(200).json({
    statusCode: 200,
    data: result,
  });
};

export default getAll;
