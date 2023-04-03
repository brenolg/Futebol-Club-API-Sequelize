import { Request } from 'express';

interface IRequest extends Request {
  user?: string
  email?: string

}

export default IRequest;
