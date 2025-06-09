import { Router } from "express";
import { userLogin, userRegisteration } from "../controllers/UserController.js";
import { ValidationMiddleware } from "../middleware/zod.middleware.js";
import { loginSchema, registerSchema } from "../model/zod.schema.js";
const userRouter = Router();

// register user
userRouter
  .route("/register")
  .post(ValidationMiddleware(registerSchema), userRegisteration);
userRouter.route("/login").post(ValidationMiddleware(loginSchema), userLogin);

// login userSS

export default userRouter;
