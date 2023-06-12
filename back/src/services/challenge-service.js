import { Challenge } from "../db/models/challenge.js";
import { User } from "../db/index.js";
import { updateTimestamps } from "../utils/update-time-stamps.js";
class ChallengeService {
  static makeDueDate(weeks){
    // weeks : '1주','2주','3주','4주'
    let weeksInt = parseInt(weeks.replace('주', '')) 
    let newDueDate = new Date();
    newDueDate.setDate(newDueDate.getDate() + (weeksInt * 7)); 
    return newDueDate
  }
  
  static async createChallenge({ userId, title, content, icon, weeks }) {
    if (!title || !content || !icon || !weeks){ 
      throw new Error("제목, 내용, 아이콘, 기간 모두 입력해 주세요."); 
    }

    const dueDate = this.makeDueDate(weeks)
    const createdChallenge = await Challenge.create({ userId, title, content, icon, weeks, dueDate });
    
    //--- User Update ---
    const user = await User.findById({ userId: createdChallenge.userId })
    user.mileage += 1000;
    await user.save();
    
    // 시간을 한국표준시간으로 변경
    const createdNewChallenge=updateTimestamps(createdChallenge)
    
    return createdNewChallenge;
  }

  static async findChallenges( ) {
    const challenges = await Challenge.NoAsyncfindAll( ).populate('userId', 'username districtCode districtName').exec();
  
    return challenges;
  }

  static async findChallenge({ chllengeId }) {
    const challenge = await Challenge.NoAsyncfindById({ chllengeId }).populate('userId', 'username districtCode districtName').exec();
    // 시간을 한국표준시간으로 변경
    return updateTimestamps(challenge);
  }

  static async updateChallenge({ chllengeId, currentUserId, title, content, icon, weeks }) {
    const challenge = await Challenge.findById({ _id: chllengeId })
    
    if(!challenge) 
      throw new Error("해당 id를 가진 데이터는 없습니다.")
    if(challenge.userId.toString() !== currentUserId) 
      throw new Error("수정 권한이 없습니다.");
    if (challenge.commentsCount != 0)
      throw new Error("참여자가 존재하여 수정 할 수 없습니다.") 
    if (challenge.isCompleted === true)
      throw new Error("챌린지 기간이 끝났습니다, 참여 할 수 없습니다.")

    const updateChallenge = await Challenge.update({ chllengeId, title, content, icon, weeks, dueDate: this.makeDueDate(weeks) })
    
    // 시간을 한국표준시간으로 변경
    return updateTimestamps(updateChallenge);
  }
  
  static async deleteChallenge(chllengeId, currentUserId) {
    const challenge = await Challenge.findById({ _id: chllengeId })
    if(!challenge){
      throw new Error("해당 id를 가진 데이터는 없습니다.");
    }
    if(challenge.userId.toString() !== currentUserId){
      throw new Error("삭제 권한이 없습니다.");
    }
    if (challenge.commentsCount != 0){
      throw new Error("참여자가 존재하여 삭제 할 수 없습니다.")
    }
    await Challenge.deleteById( chllengeId );
    return { status: "ok" };
  }

}

export { ChallengeService };
