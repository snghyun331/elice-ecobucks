import { userAuthService } from "../services/user-service.js";
import { validateEmptyBody } from "../utils/validators.js";
import { NOT_FOUND, CREATED, OK, NO_CONTENT } from "../utils/constants.js";
import { userModel } from "../db/schemas/user.js";

const userController = {
  postUserRegister: async function (req, res, next) {
    try {
      validateEmptyBody(req)
      const { username, email, password, districtName } = req.body;

      const newUser = await userAuthService.addUser({
        username,
        email,
        password,
        districtName,
      });
  
      if (newUser.errorMessage) {
        throw new Error(newUser.errorMessage);
      }
  
      return res.status(CREATED).send(newUser);
    } catch (error) {
      next(error);
    }
  },

  postUserLogin: async function (req, res, next) {
    try {

      const { email, password } = req.body;
  
      // 위 데이터를 이용하여 유저 db에서 유저 찾기
      const user = await userAuthService.getUser({ email, password });
  
      if (user.errorMessage) {
        throw new Error(user.errorMessage);
      }
  
    return res.status(OK).send(user);
    } catch (error) {
      next(error);
    }
  },

  GetUser_userlist: async function (req, res, next) {
    try {
      // 전체 사용자 목록을 얻음
      const users = await userAuthService.getUsers();
      res.status(OK).send(users);
    } catch (error) {
      error.status = NOT_FOUND;
      next(error);
    }
  },

  getUserMyPage: async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const userId = req.currentUserId;
      const currentUserInfo = await userAuthService.getUserMypage({ userId });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

    return res.status(OK).send(currentUserInfo);
    } catch (error) {
      error.status = NOT_FOUND;
      next(error);
    }
  },
  
  getUserMyPageChallenges: async function (req, res, next) {
    try{
      const userId = req.currentUserId;
      const UserChallengeInfo = await userAuthService.getUserMyPageChallenges({ userId });   
      
      if (UserChallengeInfo.errorMessage){
        throw new Error(UserChallengeInfo.errorMessage);
      }
    return res.status(OK).send(UserChallengeInfo);
    } catch (error) {
      error.status = NOT_FOUND;
      next(error);
    }
  },

  getUserErrYellow: async function (req, res, next) {
    try {
      const userId = req.params._id;
      const currentUserInfo = await userAuthService.getUserInfo({ userId });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

    return res.status(OK).send(currentUserInfo);
    } catch (error) {
      error.status = NOT_FOUND;
      next(error);
    }
  },

  userGetcurrent: async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const userId = req.currentUserId;
      const currentUserInfo = await userAuthService.getUserInfo({
        userId,
      });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      return res.status(OK).send(currentUserInfo);
      } catch (error) {
        error.status = NOT_FOUND;
        next(error);
    }
  },


  userDeleteWithdraw: async function (req, res, next) {
    const userId = req.currentUserId;
    try {
      const user = await userAuthService.getUserInfo({ userId })

      if(!user) {
        const errorMessage = "회원이 존재하지 않습니다."
        const result = {result: errorMessage}
        return res.status(NOT_FOUND).send(result);
      }

      user.is_withdrawed = true
      await userModel.findOneAndUpdate({ _id: userId }, { is_withdrawed: true });   // await user.save()가 안되서 다음과 같이 구현

      const result = { result : "Successfully withdraw"}
      return res.status(OK).send(result)
    } catch (error) {
      error.status = NOT_FOUND;
      next(error)
    } 
  },

  userPutMypage: async function (req, res, next) {
    try {
      // jwt토큰으로부터 사용자 id를 추출함.
      const userId = req.currentUserId;

      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const { username, districtName, password } = req.body ?? null;

      const toUpdate = { username, districtName, password };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await userAuthService.updateUser({ userId, toUpdate });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      return res.status(OK).send(updatedUser);
    } catch (error) {
      next(error);
    }                                                      
  },

  userGetChallenges: async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      //const userId = req.currentUserId;
      const userId = req.params._id;
      const currentUserInfo = await userAuthService.getUserChallenges({ userId });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

    return res.status(OK).send(currentUserInfo);
    } catch (error) {
      error.status = NOT_FOUND;
      next(error);
    }
  },

  userGetParticipants: async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const userId = req.params._id;
      const currentUserInfo = await userAuthService.getUserParticipants({ userId });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

    return res.status(OK).send(currentUserInfo);
    } catch (error) {
      error.status = NOT_FOUND;
      next(error);
    }
  },

  userGetComments: async function (req, res, next) {
    try {
        // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
        const userId = req.params._id;
        const currentUserInfo = await userAuthService.getUserComments({ userId });

        if (currentUserInfo.errorMessage) {
          throw new Error(currentUserInfo.errorMessage);
      }

      return res.status(OK).send(currentUserInfo);
      } catch (error) {
        error.status = NOT_FOUND;
        next(error);
      }
  }
}

export { userController };
