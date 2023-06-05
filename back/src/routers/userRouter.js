import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
import {PostUser_register, PostUser_login, GetUser_userlist, GetUser_current,
        GetUser_err_yellow} from "../controllers/userController.js"


const userAuthRouter = Router();

userAuthRouter.post("/user/register", PostUser_register);

userAuthRouter.post("/user/login", PostUser_login);

userAuthRouter.get(
        "/userlist",
        login_required,
        GetUser_userlist
);

userAuthRouter.get(
        "/user/current",
        login_required,
        GetUser_current
);

userAuthRouter.get(
        "/users/:id",
        login_required,
        GetUser_err_yellow
);



export { userAuthRouter };
