import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
import {PostUser_register, PostUser_login, GetUser_userlist, GetUser_myPage,
        GetUser_err_yellow,
        userPutMypage} from "../controllers/userController.js"


const userAuthRouter = Router();

userAuthRouter.post("/register", PostUser_register);

userAuthRouter.post("/login", PostUser_login);

userAuthRouter.get(
        "/mypage",
        login_required,
        GetUser_myPage
);

userAuthRouter.get(
        "/users/:_id",
        // login_required,
        GetUser_err_yellow
);

userAuthRouter.put(
        "/mypage/useredit/:_id",
        login_required,
        userPutMypage
)


export { userAuthRouter };
