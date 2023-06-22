import { Router } from "express";
import { loginRequired } from "../middlewares/login-required.js";
import { userController } from "../controllers/user-controller.js"
import { Validation } from "../middlewares/validation.js";

const userRegisterValidation = Validation.validate(Validation.userSchema);
const userUpdateValidation = Validation.validate(Validation.userUpdateSchema);

const userAuthRouter = Router();

userAuthRouter.post("/register", userRegisterValidation, userController.postUserRegister);

userAuthRouter.post("/login", userController.postUserLogin);

userAuthRouter.get("/current",loginRequired, userController.userGetcurrent);

userAuthRouter.get("/mypage", loginRequired, userController.getUserMyPage);

userAuthRouter.get("/mypage/challenges", loginRequired, userController.getUserMyPageChallenges);

userAuthRouter.get("/users/:_id", loginRequired, userController.getUserErrYellow);
// 유저의 작성한 챌린지 내역들 조회
userAuthRouter.get("/users/:_id/challenges", loginRequired, userController.userGetChallenges);
// 유저의 챌린지 참가신청 내역들을 조회 
userAuthRouter.get("/users/:_id/participants", loginRequired, userController.userGetParticipants);
// 유저의 댓글 내역들을 조회 
userAuthRouter.get("/users/:_id/comments", loginRequired, userController.userGetComments);

userAuthRouter.put("/mypage/useredit", loginRequired, userUpdateValidation, userController.userPutMypage)

userAuthRouter.delete("/mypage/withdraw", loginRequired, userController.userDeleteWithdraw)

export { userAuthRouter };
