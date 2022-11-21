import { IContact } from './../../types/contact/IContact';
import { Request, Response } from 'express';
import Contact from '../../models/Contact.model';
import errorService from '../../service/error-service';

const getById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const body = req.body;
  const bodyKeys = Object.keys(body);
  const requiredFields = ['name', 'email', 'phone'];
  const isNotExistFields = requiredFields.filter(
    (key) => !bodyKeys.includes(key)
  );
  let result: IContact | null = {} as IContact;

  if (!isNotExistFields.length)
    result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  else
    return res
      .status(400)
      .json({ message: `missing required ${isNotExistFields} field` });

  if (!result) {
    return errorService.badRequest(res, 'Contact not found');
  }

  return res.status(200).json({
    statusCode: 200,
    data: result,
  });
};

export default getById;
