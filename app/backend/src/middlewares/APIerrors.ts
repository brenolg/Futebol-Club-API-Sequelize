import { NextFunction, Request, Response } from 'express';
import ApiError from '../shared/api.errors';

const errorMiddleware = (
  error: Error & Partial<ApiError>,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.log('err', error);
  const { status, message } = error;
  res.status(status || 500).json({ message });
};
export default errorMiddleware;
