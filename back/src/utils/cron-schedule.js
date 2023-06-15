import fs from 'fs';
import cron from "node-cron";
import moment from 'moment-timezone'
import { Image } from "../db/index.js";
import { challengeModel } from "../db/schemas/challenge.js";
import { participationModel } from "../db/schemas/challenge-participation.js";
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

      //dueDate(마감기한)가 지날때 participation 참여기록삭제, 저장된 이미지도 삭제
      const expiredChallenges = await challengeModel.find({ dueDate: { $lt: now } });
      const challengeIds = expiredChallenges.map(challenge => challenge._id);
      const participations = await participationModel.find({ challengeId: { $in: challengeIds } });
      for (let participation of participations) {
        //await imageModel.findByIdAndRemove(participation.imageId);
        console.log('이미지 삭제: ',participation.imageId); 
        const image = await Image.findById({_id: participation.imageId})  
        if(image){
          console.log('image: ',image);
          if (image.path)
            fs.unlinkSync(image.path);
          await Image.deleteImage( participation.imageId ) 
        }
        await participationModel.findByIdAndRemove(participation._id); 
      }

      // 챌린지 참여 할 수 있는 권한 다시 부여
      await participationModel.updateMany(
        { }, { $set: { hasParticipatedToday: false } }
      );

      console.log('---Updated challenges---');
      console.log(now);
    }catch (error) {
      console.error('Failed to update challenges:', error);
    }
  });
}


