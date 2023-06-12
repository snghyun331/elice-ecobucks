import cron from "node-cron";
import { challengeModel } from "../db/schemas/challenge.js";
import { participationModel } from "../db/schemas/challenge-participation.js";
import moment from 'moment-timezone'

// UTC와 한국 표준시(KST)는 9시간 차이로 한국이 9시간 빠르다 
// UTC 기준 자정 정각 시간 : '0 0 * * *' 
// UTC 기준 오전3시(3시)가 한국 정오(12시)시각이므로 3 사용 : '0 3 * * *'
// UTC 기준 오후3시(15시)가 한국 자정(0시)시각이므로 15를 사용 : '0 15 * * *' [사용] 
// 1분마다 update 테스트용 : '*/1 * * * *' 
export async function scheduleChallenge() {
  console.log("scheduleChallenge")
  const now = moment().tz('Asia/Seoul').format();
  console.log(now);
  cron.schedule('0 15 * * *', async function() { 
    try{
      const now = moment().tz('Asia/Seoul').format();
      // dueDate(마감기한)가 지날때 isCompleted = true
      const show = await challengeModel.updateMany(
        { dueDate: { $lt: now }, isCompleted: false },
        { $set: { isCompleted: true } }
      );
      // 챌린지 참여 할 수 있는 권한 다시 부여
      await participationModel.updateMany(
        { }, { $set: { hasParticipatedToday: false } }
      );
      console.log('---Updated challenges---');
      console.log(now);
    }catch{
      console.error('Failed to update challenges:', error);
    }
  });
}


