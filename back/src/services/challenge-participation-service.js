import { User, Challenge, ChallengeParticipation, Image } from "../db/index.js";
import { updateTime } from "../utils/update-time.js";
import { setError, handleError } from "../utils/customError.js"
import { validatePermission } from "../utils/validators.js";
import { imageService } from "./image-service.js";

class ParticipationService {
  static async createParticipation({ userId, challengeId, imageId }) {
    try{
      let createNewParticipation;
      const image = await Image.findById({ _id: imageId });
        if (!image){
          throw setError("imageId가 존재하지 않습니다.", 400, "BAD_REQUEST")
      }
      const participation = await ChallengeParticipation.findOne({ challengeId });
      const challenge = await Challenge.findById({ _id: challengeId })

      //--- Check ---
      // 1) challenge 참여기간 종료 Check, dueDate를 넘을경우 신청x
      const currentDateTime = new Date();
      if (challenge.dueDate.getTime() < currentDateTime.getTime()){
        challenge.isCompleted = true;
        throw setError("참여기간이 종료되었습니다", 409, "CONFLICT")
      }

      // participation가 처음 생성일 때 
      if (participation == null){
        // 생성된 이미지들의 아이디가 아닐경우
        const data = { userId, challengeId, imageId, hasParticipatedToday: false } // true
        const createParticipation = await ChallengeParticipation.create(data);
        // 시간을 한국표준시간으로 변경
        createNewParticipation=updateTime.toTimestamps(createParticipation);
      }
      else {
        // 2) participation 존재할때, 하루에 한번 참여 hasParticipatedToday: false -> true
        if (participation.hasParticipatedToday == true){
          throw setError("같은 챌린지에는 하루에 한번 참여 할 수 있습니다.", 409, "CONFLICT")
        }
        participation.hasParticipatedToday = true
        const createInput = { userId, challengeId, imageId, hasParticipatedToday: false } // true
        const createParticipation = await ChallengeParticipation.create(createInput);
        createNewParticipation=updateTime.toTimestamps(createParticipation);
      }
      if (!createNewParticipation)  
        throw setError("참여 신청 실패", 500, "CREATE_FAILED")
        
      //--- Update ---  
      //1) Challenge Update      
      // challenge 신청자 count 증가
      challenge.participantsCount += 1; 

      //2) User Update
      // 유저정보 갱신 - 참여자 마일리지 1000추가
      const user = await User.findById({ userId });
      user.mileage += 1000;
      await user.save();
      await participation.save();
      await challenge.save();
      
      return createNewParticipation;
    } catch (error) {
      throw handleError(error)
    }
    
  }

  static async findParticipations({ challengeId }) {
    const participations = await ChallengeParticipation.NoAsyncfindAll({ challengeId }).populate('userId', 'username districtCode districtName').exec();
    if (participations.length === 0){
      throw setError("참여기록을 찾을 수 없습니다", 404, "NOT_FOUND")
    }
    // 포스트마다 이미지 가져오기 
    const newParticipations = await Promise.all(participations.map(async (participation) => {
      const image = await Image.findById({ _id: participation.imageId });
      if (image) {
        return {
          ...participation._doc, 
          imageId: image._id,
          path: image.path,
          createdAt: updateTime.toKST(participation.createdAt),
          updatedAt: updateTime.toKST(participation.updatedAt),  
        };
      } else {

      }
      }));

     

    return newParticipations;
  }

  static async findParticipation({ challengeId, _id }) {
    let participation = await ChallengeParticipation.NoAsyncfindById({ _id }).populate('userId', 'username districtCode districtName').exec();
    if (!participation || participation.challengeId.toString() !== challengeId){ 
      throw setError("참여기록을 찾을 수 없습니다", 404, "NOT_FOUND")
    }
    //participation.imageId = await Image.findById({ _id: participation.imageId });

    const image = await Image.findById({ _id: participation.imageId });
    if (image) {
      participation = {
        ...participation._doc,   
        imageId: image._id,
        path: image.path,
        createdAt: updateTime.toKST(participation.createdAt),
        updatedAt: updateTime.toKST(participation.updatedAt)
      };
    }

    return participation;
  }

  static async updateParticipation({ _id, currentUserId, imageId }) {
    try{
      const participation = await ChallengeParticipation.findById({ _id });
      await validatePermission(participation, currentUserId);

      let updateParticipation = await ChallengeParticipation.update({ _id, imageId })
      const image = await Image.findById({ _id: participation.imageId });
      if (image) {
      updateParticipation = {
        ...updateParticipation._doc,   
        imageId: image._id,
        path: image.path,
        createdAt: updateTime.toKST(updateParticipation.createdAt),
        updatedAt: updateTime.toKST(updateParticipation.updatedAt)
      };
    }
      
      return updateParticipation;

    } catch (error) {
      throw handleError(error)
    }
    
  }

  static async deleteParticipation(challengeId, _id, currentUserId) {
    try{
      const participation = await ChallengeParticipation.findById({ _id });
      await validatePermission(participation, currentUserId);


    
      // 삭제시 Challenge의 participantsCount 1감소
      const challenge = await Challenge.findById({ _id:challengeId })

      challenge.participantsCount += -1;
      await challenge.save();

      //--- User Update ---
      // 유저정보 갱신 - 참여자 마일리지 1000감소
      const user = await User.findById({ userId: currentUserId });
      user.mileage -= 1000;
      await user.save();

      // 업로드 이미지와 참여신청 삭제
      await ChallengeParticipation.deleteById(_id);
      await imageService.deleteImage( participation.imageId );
    } catch (error) {
      throw handleError(error)
    }
  }

}
 
export { ParticipationService };
