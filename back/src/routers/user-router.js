import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";
import {PostUser_register, PostUser_login, GetUser_myPage,
        GetUser_err_yellow, userDeleteWithdraw,userGetcurrent,userPutMypage} from "../controllers/user-controller.js"


const userAuthRouter = Router();

userAuthRouter.post("/register", PostUser_register);

userAuthRouter.post("/login", PostUser_login);

userAuthRouter.get("/current",login_required, userGetcurrent);

userAuthRouter.get("/mypage", login_required, GetUser_myPage);

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

userAuthRouter.delete("/mypage/withdraw",login_required,userDeleteWithdraw)

export { userAuthRouter };
