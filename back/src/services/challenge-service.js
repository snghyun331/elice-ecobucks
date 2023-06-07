import { Challenge } from "../db/models/challenge.js";

class ChallengeService {
  
  static makeDueDate(weeks){
    let weeksInt = parseInt(weeks.replace('주', '')) 
    let newDueDate = new Date(); // 현재 날짜, 시간
    newDueDate.setDate(newDueDate.getDate() + (weeksInt * 7)); //요청받은 주를 날짜로 변환해서 더하기
    return newDueDate
  }
  
  static async createChallenge({ user_id, title, content, icon, weeks }) {
    if (!title) throw new Error("모두 기입해 주세요."); // DueDate : ('1주','2주','3주','4주' 요청값) 
  
    const createdChallenge = await Challenge.create({ user_id, title, content, icon, weeks, dueDate: this.makeDueDate(weeks) });
    
    return createdChallenge;
  }

  static async findChallenges( ) {
    const challenges = await Challenge.findAll({ });

    return challenges;
  }

  static async findChallenge({ _id }) {
    const challenge = await Challenge.findById({ _id });

    return challenge;
  }

  static async updateChallenge({ _id, currentUserId, title, content, icon, weeks }) {
    const findIdChallenge = await Challenge.findById({ _id })
    console.log('findIdChallenge: ',findIdChallenge);
    if ( !findIdChallenge ) {
      throw new Error("해당 id를 가진 데이터는 없습니다.")
    }
    console.log('findIdChallenge.user_id: ',findIdChallenge.user_id.toString());
    console.log('currentUserId: ',currentUserId);
    if( findIdChallenge.user_id.toString() !== currentUserId )
      throw new Error("수정 권한이 없습니다.");
    
    updatedChallenge = await Challenge.update({ _id, title, content, icon, weeks, DueDate: this.makeDueDate(weeks) })

    return updatedChallenge;
  }



}

export { ChallengeService };
