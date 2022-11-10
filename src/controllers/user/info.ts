import { Response, Request } from 'express';
import userDto from '../../dto/user-dto.js';
import User from '../../models/User.model.js';
import errorService from '../../service/error-service.js';
import { IReqUser } from '../../types/server/IQueryPagination.js';

const info = async (req: Request, res: Response): Promise<Response> => {
  const { user: reqData } = req as unknown as IReqUser;

  const user = await User.findOne({ _id: reqData.id });
  if (!user) {
    return errorService.badRequest(res, 'User not found');
  }

  const data = userDto.removeUserPassword(user);

  return res.status(200).json({ statusCode: 200, data });
};

export default info;
