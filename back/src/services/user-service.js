import { userModel } from "../db/schemas/user.js";
import { User, Gu, Challenge } from "../db/index.js"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

class userAuthService {
  static async addUser({ username, email, password, districtName }) {
    // 이메일 중복 확인
    const user = await User.findByEmail({ email });
    if ((user)&&(user.is_withdrawed === false)) {
      const errorMessage =
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
      return { errorMessage };
    }

    // 해당 email을 가진 탈퇴한 회원이었다면,
    const withdrawnUser = await User.findWithdraw({ email })
    if (withdrawnUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const districtCode = await Gu.getdistrictCodeByName(districtName)
      // 기존 정보에서 다시 가입할 때 등록한 정보로 업데이트
      const updatedUser = await userModel.findOneAndUpdate(   
        {email: email, is_withdrawed: true},  // 필터링
        {username: username, email: email, password: hashedPassword, districtCode: districtCode, is_withdrawed: false},  // 업데이트 항목들
        { returnOriginal: false }   // 업데이트 된 상태로 저장
      )
      return updatedUser
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 구 코드 변환
    const districtCode = await Gu.getdistrictCodeByName(districtName)

    const newUser = { username, email, password: hashedPassword, districtCode, districtName };

    // db에 저장
    const createdNewUser = await User.create({ newUser });
    createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewUser;
  }


  static async getUser({ email, password }) {
    // 이메일 db에 존재 여부 확인
    const user = await User.findByEmail({ email });
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (user.is_withdrawed === true) {
      const errorMessage = "이미 탈퇴한 회원입니다. 다시 가입해주세요"
      return {errorMessage}
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ userId: user._id }, secretKey);
  
    // 반환할 loginuser 객체를 위한 변수 설정
    const _id = user._id;
    const username = user.username;
    const districtCode = user.districtCode;
    const mileage = user.mileage;

    const loginUser = {
      token,
      _id,
      email,
      username,
      districtCode,
      mileage,
      errorMessage: null,
    };

    return loginUser;
  }

  static async getUsers() {
    const users = await User.findAll();
    return users;
  }

  
  static async getUserInfo({ userId }) {
    const user = await User.findById({ userId });
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    
    return user;
  }

  static async updateUser({ userId, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let user = await User.findById({ userId });
    
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    
    // districtName을 districtCode로 변환
    if (toUpdate.districtName) {
      const districtCode = await Gu.getdistrictCodeByName(toUpdate.districtName);
      toUpdate.districtCode = districtCode;
    }
    if (toUpdate.password) {
      const hashedPassword = await bcrypt.hash(toUpdate.password, 10);
      toUpdate.password = hashedPassword;
    }

    const fieldsToUpdate = {
      username: "username",
      password: "password",
      districtName: "districtName",
      districtCode: "districtCode",
    }


    for (const [field, fieldToUpdate] of Object.entries(fieldsToUpdate)) {
      if (toUpdate[field] || field === "description") {
        const newValue = toUpdate[field];
        user = await User.update({
          userId,
          fieldToUpdate,
          newValue,
        });
      }
    }

    return user;  
  }

  static async getUserMypage({userId}){
    const user  = await User.findById({userId});

    const challenges = await Challenge.findAllByUserId({ userId: userId });
    const userInfo = {
      ...user._doc,
      challengeCount: challenges.length,
      challengeList: challenges,
    }
    return userInfo
  }

  static async getUserChallenges({userId}){
    const user  = await User.findById({userId});

    const challenges = await Challenge.findAllByUserId({ userId: userId });
    const userInfo = {
      ...user._doc,
      challengeCount: challenges.length,
      challengeList: challenges,
    }
    return userInfo
  }

  static async getUserParticipants({userId}){
    const user  = await User.findById({userId});

    const challenges = await Challenge.findAllByUserId({ userId: userId });
    const userInfo = {
      ...user._doc,
      challengeCount: challenges.length,
      challengeList: challenges,
    }
    return userInfo
  }

  static async getUserComments({userId}){
    const user  = await User.findById({userId});

    const challenges = await Challenge.findAllByUserId({ userId: userId });
    const userInfo = {
      ...user._doc,
      challengeCount: challenges.length,
      challengeList: challenges,
    }
    return userInfo
  }
}

export { userAuthService };
