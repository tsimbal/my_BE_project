import { Request, Response } from 'express';
import Contact from '../../models/Contact.model';
import errorService from '../../service/error-service';

const updateFavorite = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  if (!Object.keys(req.body).length) {
    return errorService.badRequest(res, 'missing field favorite');
  }

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    return errorService.badRequest(res, 'Contact not found');
  }

  return res.status(200).json({
    statusCode: 200,
    data: result,
  });
};

export default updateFavorite;
