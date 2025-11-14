import {Router} from "express";

const userRouter = Router();

userRouter.route("/register").post();
userRouter.route("/login").post();

export default userRouter;