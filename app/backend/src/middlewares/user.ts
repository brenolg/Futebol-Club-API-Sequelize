import { NextFunction, Request, Response } from 'express';
import ApiError from '../shared/api.errors';
import { verifyToken } from '../auth/authFuncs';

const validateAcesLogin = (
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

const validateToken = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.header('Authorization');

  if (!token) throw new ApiError(401, 'Token not found');

  try {
    const validToken = verifyToken(token);

    req.body.user = validToken;

    next();
  } catch (error) {
    throw new ApiError(401, 'Token must be a valid token');
  }
};
const userMiddlewares = { validateAcesLogin, validateToken };

export default userMiddlewares;
