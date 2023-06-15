import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";
import { userController } from "../controllers/user-controller.js"
import { Validation } from "../middlewares/validation.js";

const userRegisterValidation = Validation.validate(Validation.userSchema);
const userUpdateValidation = Validation.validate(Validation.userUpdateSchema);

const userAuthRouter = Router();

userAuthRouter.post("/register", userRegisterValidation, userController.postUserRegister);

userAuthRouter.post("/login", userController.postUserLogin);

userAuthRouter.get("/current",login_required, userController.userGetcurrent);

userAuthRouter.get("/mypage", login_required, userController.getUserMyPage);

userAuthRouter.get("/mypage/challenges", login_required, userController.getUserMyPageChallenges);

userAuthRouter.get("/users/:_id", login_required, userController.getUserErrYellow);
// 유저의 작성한 챌린지 내역들 조회
userAuthRouter.get("/users/:_id/challenges", login_required, userController.userGetChallenges);
// 유저의 챌린지 참가신청 내역들을 조회 
userAuthRouter.get("/users/:_id/participants", login_required, userController.userGetParticipants);
// 유저의 댓글 내역들을 조회 
userAuthRouter.get("/users/:_id/comments", login_required, userController.userGetComments);

userAuthRouter.put("/mypage/useredit", login_required, userUpdateValidation, userController.userPutMypage)

userAuthRouter.delete("/mypage/withdraw", login_required, userController.userDeleteWithdraw)

export { userAuthRouter };
