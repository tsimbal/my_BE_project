import { Request, Response } from 'express';
import Contact from '../../models/Contact.model';
import errorService from '../../service/error-service';

const removeById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);

  if (!result) {
    return errorService.badRequest(res, 'Caontact not found');
  }

  return res.json({ statusCode: 200, message: 'Contact deleted' });
};

export default removeById;
