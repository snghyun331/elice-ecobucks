import { Challenge } from "../db/models/Challenge.js";

class ChallengeService {
  static async createChallenge({ user_id, title, content, icon, DueDate }) {
    if (!title) throw new Error("모두 기입해 주세요.");
    // DueDate : ('1주','2주','3주','4주' 요청값) 
    let week = parseInt(DueDate.replace('주', '')) 
    
    let newDueDate = new Date(); // 현재 날짜, 시간
    newDueDate.setDate(newDueDate.getDate() + (week * 7));
    DueDate = newDueDate
    //요청받은 주를 날짜로 변환해서 더하기
    console.log('newDueDate: ',newDueDate);
    const createdChallenge = await Challenge.create({ user_id, title, content, icon, DueDate });

    return createdChallenge;
  }

  static async getChallenge({ user_id }) {
    const createdChallenge = await Challenge.findById({ user_id });

    return createdChallenge;
  }

}

export { ChallengeService };
