import { Request, Response } from 'express';
import Contact from '../../models/Contact.model';
import errorService from '../../service/error-service';

const getAll = async (req: Request, res: Response): Promise<Response> => {
  const result = await Contact.find();
  if (!result) {
    return errorService.badRequest(res, 'Contacts not found');
  }

  return res.status(200).json({
    statusCode: 200,
    data: result,
  });
};

export default getAll;
