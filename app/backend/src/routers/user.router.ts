import { Request, Response, Router } from 'express';
import UserController from '../controllers/user.controller';
import userMiddlewares from '../middlewares/user';

const userRouter = Router();
const userController = new UserController();

userRouter.post(
  '/',
  userMiddlewares.validateAces,
  (req: Request, res: Response) =>
    userController.login(req, res),
);

export default userRouter;
