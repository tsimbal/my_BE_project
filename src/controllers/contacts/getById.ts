import { Request, Response } from 'express';
import Contact from '../../models/Contact.model';
import errorService from '../../service/error-service';

const getById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const result = await Contact.findById(id);

  if (!result) {
    return errorService.badRequest(res, 'Contact not found');
  }

  return res.status(200).json({
    statusCode: 200,
    data: result,
  });
};

export default getById;
