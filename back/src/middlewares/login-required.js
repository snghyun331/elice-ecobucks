import jwt from "jsonwebtoken";
import { BAD_REQUEST } from "../utils/constants.js";

function loginRequired(req, res, next) {
  // request 헤더로부터 authorization bearer 토큰을 받음.
  const authHeader = req.headers["authorization"];
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("서비스 사용 요청이 있습니다. Authorization 토큰: 없음");
    res.status(BAD_REQUEST).send("로그인한 유저만 사용할 수 있는 서비스입니다.");
    return;
  }

  // Extract the token from the authHeader
  const userToken = authHeader.split(" ")[1];

  // 이 토큰은 jwt 토큰 문자열이거나, 혹은 "null" 문자열임.
  // 토큰이 "null" 일 경우, login_required 가 필요한 서비스 사용을 제한함.
  if (userToken === "null") {
    console.log("서비스 사용 요청이 있습니다. Authorization 토큰: 없음");
    res.status(BAD_REQUEST).send("로그인한 유저만 사용할 수 있는 서비스입니다.");
    return;
  }

  // 해당 token 이 정상적인 token인지 확인 -> 토큰에 담긴 userId 정보 추출
  try {
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const jwtDecoded = jwt.verify(userToken, secretKey, { expiresIn: '1h' });
    const userId = jwtDecoded.userId ;
    req.currentUserId = userId;
    next();
  } catch (error) {
    res.status(BAD_REQUEST).send("정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.");
    return;
  }
}

export { loginRequired };
