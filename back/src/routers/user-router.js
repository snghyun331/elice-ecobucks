import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";
import {PostUser_register, PostUser_login, GetUser_myPage, userGetChallenges, userGetParticipants, userGetComments,
        GetUser_err_yellow, userDeleteWithdraw,userGetcurrent,userPutMypage} from "../controllers/user-controller.js"
import { userValidation } from "../middlewares/validation.js";


const userAuthRouter = Router();

userAuthRouter.post("/register", userValidation, PostUser_register);

userAuthRouter.post("/login", PostUser_login);

userAuthRouter.get("/current",login_required, userGetcurrent);

userAuthRouter.get("/mypage", login_required, GetUser_myPage);

userAuthRouter.get("/users/:_id", login_required, GetUser_err_yellow);
// 유저의 작성한 챌린지 내역들 조회
userAuthRouter.get("/users/:_id/challenges", login_required, userGetChallenges);
// 유저의 챌린지 참가신청 내역들을 조회 
userAuthRouter.get("/users/:_id/participants", login_required, userGetParticipants);
// 유저의 댓글 내역들을 조회 
userAuthRouter.get("/users/:_id/comments", login_required, userGetComments);

userAuthRouter.put("/mypage/useredit/:_id",login_required,userPutMypage)

userAuthRouter.delete("/mypage/withdraw",login_required,userDeleteWithdraw)

export { userAuthRouter };
