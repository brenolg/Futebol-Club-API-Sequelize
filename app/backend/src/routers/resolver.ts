import { Handler, NextFunction, Request, Response } from 'express';

const resolver = (handlerFn: Handler) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  Promise.resolve(handlerFn(req, res, next))
    .catch((e) => next(e));
};

export default resolver;
