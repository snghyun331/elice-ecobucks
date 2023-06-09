import { Challenge } from "../db/models/challenge.js";
import { User } from "../db/index.js";
import { updateTimestamps } from "../utils/update-time-stamps.js";
class ChallengeService {
  
  static makeDueDate(weeks){
    // weeks : ( 요청값: '1주','2주','3주','4주' )
    let weeksInt = parseInt(weeks.replace('주', '')) 
    let newDueDate = new Date(); // 현재 날짜, 시간
    newDueDate.setDate(newDueDate.getDate() + (weeksInt * 7)); 
    return newDueDate
  }
  
  static async createChallenge({ userId, title, content, icon, weeks }) {
    if (!title || !content || !icon || !weeks){ 
      throw new Error("제목, 내용, 아이콘, 기간 모두 입력해 주세요."); 
    }

    // 테스트용 마감기한 1분뒤로 설정해서 확인  
    //let newDueDate = new Date();
    //const dueDate = newDueDate.setMinutes(newDueDate.getMinutes() + 1);
    const dueDate = this.makeDueDate(weeks)
    const challenge = await Challenge.create({ userId, title, content, icon, weeks, dueDate });
    
    //--- User Update ---
    // 유저정보 갱신 - 참여자 마일리지 추가
    const user = await User.findById({ userId: challenge.userId })
    user.mileage += 1000;
    await user.save();
    
    // 시간을 한국표준시간으로 변경
    const updateChallenge=updateTimestamps(challenge)
    
    return updateChallenge;
  }

  static async findChallenges( ) {
    const challenges = await Challenge.NoAsyncfindAll( ).populate('userId', 'username districtCode districtName').exec();
  
    return challenges;
  }

  static async findChallenge({ _id }) {
    const challenge = await Challenge.NoAsyncfindById({ _id }).populate('userId', 'username districtCode districtName').exec();
    // 시간을 한국표준시간으로 변경
    return updateTimestamps(challenge);
  }

  static async updateChallenge({ _id, currentUserId, title, content, icon, weeks }) {
    const findIdChallenge = await Challenge.findById({ _id })
    
    if(!findIdChallenge) 
      throw new Error("해당 id를 가진 데이터는 없습니다.")
    if(findIdChallenge.userId.toString() !== currentUserId) 
      throw new Error("수정 권한이 없습니다.");
    if (findIdChallenge.commentsCount != 0)
      throw new Error("참여자가 존재하여 수정 할 수 없습니다.") 
    if (findIdChallenge.isCompleted === true)
      throw new Error("챌린지 기간이 끝났습니다, 참여 할 수 없습니다.")

    const updatedChallenge = await Challenge.update({ _id, title, content, icon, weeks, dueDate: this.makeDueDate(weeks) })
    
    // 시간을 한국표준시간으로 변경
    return updateTimestamps(updatedChallenge);
  }
  
  static async deleteChallenge(_id, currentUserId) {
    const findIdChallenge = await Challenge.findById({ _id })
    if(findIdChallenge.userId.toString() !== currentUserId){
      throw new Error("삭제 권한이 없습니다.");
    }
    if (findIdChallenge.commentsCount != 0){
      throw new Error("참여자가 존재하여 삭제 할 수 없습니다.")
    }
    await Challenge.deleteById( _id );
    return { status: "ok" };
  }

}

export { ChallengeService };
