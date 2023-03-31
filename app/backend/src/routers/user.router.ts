import { Request, Response, Router } from 'express';
import UserController from '../controllers/user.controller';
import userMiddlewares from '../middlewares/user';

const userRouter = Router();
const userController = new UserController();

userRouter.post(
  '/',
  userMiddlewares.validateAcesLogin,
  (req: Request, res: Response) =>
    userController.login(req, res),
);

userRouter.get(
  '/role',
  userMiddlewares.validateToken,
  (req: Request, res: Response) =>
    userController.loginRole(req, res),
);

export default userRouter;
