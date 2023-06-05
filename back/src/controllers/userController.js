import { userAuthService } from "../services/userService.js";
import is from '@sindresorhus/is';


const PostUser_register = async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }
      
      const { username, email, password, gu_code } = req.body;
  
      const newUser = await userAuthService.addUser({
        username,
        email,
        password,
        gu_code
      });
  
      if (newUser.errorMessage) {
        throw new Error(newUser.errorMessage);
      }
  
      return res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }


const PostUser_login = async function (req, res, next) {
    try {

      const { email, password } = req.body;
  
      // 위 데이터를 이용하여 유저 db에서 유저 찾기
      const user = await userAuthService.getUser({ email, password });
  
      if (user.errorMessage) {
        throw new Error(user.errorMessage);
      }
  
    return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }



const GetUser_userlist = async function (req, res, next) {
    try {
      // 전체 사용자 목록을 얻음
      const users = await userAuthService.getUsers();
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }


const GetUser_myPage = async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const user_id = req.currentUserId;
      
      const currentUserInfo = await userAuthService.getUserInfo({
        user_id,
      });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

    return res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }


const GetUser_err_yellow =  async function (req, res, next) {
    try {
      const user_id = req.params._id;
      const currentUserInfo = await userAuthService.getUserInfo({ user_id });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

    return res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }




export {PostUser_register, PostUser_login, GetUser_userlist, 
    GetUser_myPage, GetUser_err_yellow};