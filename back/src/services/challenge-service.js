import { Challenge } from "../db/models/challenge.js";

class ChallengeService {
  
  static makeDueDate(weeks){
    let weeksInt = parseInt(weeks.replace('주', '')) 
    let newDueDate = new Date(); // 현재 날짜, 시간
    newDueDate.setDate(newDueDate.getDate() + (weeksInt * 7)); //요청받은 주를 날짜로 변환해서 더하기
    return newDueDate
  }
  
  static async createChallenge({ userId, title, content, icon, weeks }) {
    if (!title) throw new Error("모두 기입해 주세요."); // DueDate : ('1주','2주','3주','4주' 요청값) 
  
    const createdChallenge = await Challenge.create({ userId, title, content, icon, weeks, dueDate: this.makeDueDate(weeks) });
    
    return createdChallenge;
  }

  static async findChallenges( ) {
<<<<<<< HEAD
    const challenges = await Challenge.NoAsyncfindAll( ).populate('userId', 'guCode guName').exec();
=======
    const challenge = await Challenge.NoAsyncfindAll( ).populate('user_id', 'username guCode guName').exec();
>>>>>>> 8c5162323d2d38d1cccc9c74b35f6a3ac34f65db

    return challenge;
  }

  static async findChallenge({ _id }) {
<<<<<<< HEAD
    const challenge = await Challenge.NoAsyncfindById({ _id }).populate('userId', 'guCode guName').exec();
    //console.log('guName: ', challenge.userId.guName);
=======
    const challenge = await Challenge.NoAsyncfindById({ _id }).populate('user_id', 'username guCode guName').exec();
>>>>>>> 8c5162323d2d38d1cccc9c74b35f6a3ac34f65db
    
    return challenge;
  }

  static async updateChallenge({ _id, currentUserId, title, content, icon, weeks }) {
    const findIdChallenge = await Challenge.findById({ _id })
    if ( !findIdChallenge ) {
      throw new Error("해당 id를 가진 데이터는 없습니다.")
    }
    if( findIdChallenge.userId.toString() !== currentUserId )
      throw new Error("수정 권한이 없습니다.");
    
    const updatedChallenge = await Challenge.update({ _id, title, content, icon, weeks, dueDate: this.makeDueDate(weeks) })
    
    return updatedChallenge;
  }
  
  static async deleteChallenge(_id, currentUserId) {
    const findIdChallenge = await Challenge.findById({ _id })
    if(findIdChallenge.userId.toString() !== currentUserId)
      throw new Error("삭제 권한이 없습니다.");

    await Challenge.deleteById( _id );
    return { status: "ok" };
  }

}

export { ChallengeService };
