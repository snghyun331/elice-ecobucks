/*  validatePermission 사용 예시
  const participation = await ChallengeParticipation.findById({ _id })
  if ( !participation ){ 
    throw setError("참여기록을 찾을 수 없습니다", 404, "NOT_FOUND")
  }
  if( participation.userId !== currentUserId ){
    throw setError("수정 권한이 없습니다.", 403, "FORBIDDEN")
  }

  => 이렇게 사용
  const participation = await ChallengeParticipation.findById({ _id });
  await validatePermission(participation, currentUserId);
*/

import is from "@sindresorhus/is";
import { setError } from "./customError.js";

function validateEmptyBody(req){
  // headers의 Content-Type이 application/json인지 check
  if (req.headers['content-type'] !== 'application/json') {
    throw new Error(
      "headers의 Content-Type을 application/json으로 설정해주세요"
    );
  }
  //req.body의 null check
  if (is.emptyObject(req.body)) {
    throw new Error(
      "Request body is empty"
    );
  }
}

async function checkData(findModel) {
  if (!findModel) {
    throw setError("해당 id를 가진 데이터는 없습니다.", 404, "NOT_FOUND");
  }
  return findModel;
}

// 공통 함수: 작성자 권한 확인
function checkAuthor(findModel, currentUserId) {
  if (findModel.userId.toString() !== currentUserId) {
    throw setError("작성자가 아닙니다, 권한이 없습니다.", 403, "FORBIDDEN");
  }
}
// 공통 함수: 작성자 권한 확인
async function validatePermission(findModel, currentUserId) {
  if (!findModel) {
    throw setError("해당 id를 가진 데이터는 없습니다.", 404, "NOT_FOUND");
  }
  if (findModel.userId.toString() !== currentUserId) {
    throw setError("작성자가 아닙니다, 권한이 없습니다.", 403, "FORBIDDEN");
  }
  return findModel
}

export { validateEmptyBody, checkData, checkAuthor, validatePermission }


