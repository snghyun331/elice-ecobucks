import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";
import { userController } from "../controllers/user-controller.js"
import { Validation } from "../middlewares/validation.js";

const userRegisterValidation = Validation.validate(Validation.userSchema);
const userUpdateValidation = Validation.validate(Validation.userUpdateSchema);

const userAuthRouter = Router();

userAuthRouter.post("/register", userRegisterValidation, userController.PostUser_register);

userAuthRouter.post("/login", userController.PostUser_login);

userAuthRouter.get("/current",login_required, userController.userGetcurrent);

userAuthRouter.get("/mypage", login_required, userController.GetUser_myPage);

userAuthRouter.get("/users/:_id", login_required, userController.GetUser_err_yellow);
// 유저의 작성한 챌린지 내역들 조회
userAuthRouter.get("/users/:_id/challenges", login_required, userController.userGetChallenges);
// 유저의 챌린지 참가신청 내역들을 조회 
userAuthRouter.get("/users/:_id/participants", login_required, userController.userGetParticipants);
// 유저의 댓글 내역들을 조회 
userAuthRouter.get("/users/:_id/comments", login_required, userController.userGetComments);

userAuthRouter.put("/mypage/useredit/:_id", login_required, userUpdateValidation, userController.userPutMypage)

userAuthRouter.delete("/mypage/withdraw", login_required, userController.userDeleteWithdraw)

export { userAuthRouter };
