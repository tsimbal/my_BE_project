import { IError } from './../types/errors/IErrorResp';

interface IStatusCode {
  [key: number]: string;
}

const messages: IStatusCode = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  409: 'Conflict',
};

const createError = (status: number, message: string = messages[status]) => {
  const error: IError = new Error(message);

  error.status = status;
  return error;
};

export default createError;
