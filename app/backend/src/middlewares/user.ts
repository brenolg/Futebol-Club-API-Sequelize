import { NextFunction, Request, Response } from 'express';
import ApiError from '../shared/api.errors';

const validateAces = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'All fields must be filled');
  }

  return next();
};

const userMiddlewares = { validateAces };

export default userMiddlewares;
