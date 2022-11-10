import { Request, Response } from 'express';
import Contact from '../../models/Contact.model';
import errorService from '../../service/error-service';

const getById = async (req: Request, res: Response): Promise<Response> => {
  const result = await Contact.create(req.body);
  if (!result) {
    return errorService.badRequest(res, 'Contacts not created');
  }

  return res.status(201).json({
    statusCode: 201,
    data: result,
  });
};

export default getById;
