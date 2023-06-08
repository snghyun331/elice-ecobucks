import cron from "node-cron";
import { challengeModel } from "../db/schemas/challenge.js";
import moment from 'moment-timezone'

export async function scheduleChallenge() {
  // 자정 정각마다 '0 0 * * *' 
  // 테스트용: '*/1 * * * *' 1분마다 update 
  console.log("scheduleChallenge")
  const now = moment().tz('Asia/Seoul').format();
  console.log(now);
  cron.schedule('0 0 * * *', async function() { 
    try{
      const now = moment().tz('Asia/Seoul').format();
      console.log(now);
      const show = await challengeModel.updateMany(
        { dueDate: { $lt: now }, isCompleted: false },
        { $set: { isCompleted: true } }
      );
      console.log('---Updated challenges---');
      //console.log('dueDate: ', show.dueDate);
    }catch{
      console.error('Failed to update challenges:', error);
    }
  });
}

