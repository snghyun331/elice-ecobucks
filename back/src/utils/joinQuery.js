import { updateTime } from "./update-time.js";

// populate 함수
function populateItem(item, model, count, titleKey) {
  return {
    count,
    ...item._doc,
    [titleKey]: model.title,
    createdAt: updateTime.toKST(model.createdAt),
    updatedAt: updateTime.toKST(model.updatedAt),
  };
}

async function findAllByUserIdAndPopulate(findAllByUserIdFunction, findByIdFunction, userId, titleKey) {
  const items = await findAllByUserIdFunction({ userId });
  const populatedItems = await Promise.all(
    items.map(async (item) => {
      const model = await findByIdFunction(item.challengeId);
      return populateItem(item, model, items.length, titleKey);
    })
  );

  return {
    count: populatedItems.length,
    list: populatedItems,
  };
}

export { findAllByUserIdAndPopulate };


/* 
  1. Use this code
  static async getUserParticipants({ userId }) {
    return await findAllByUserIdAndPopulate(ChallengeParticipation.findAllByUserId, Challenge.findById, userId, "challengeTitle");
  }

  1. Origin Code
  // 유저의 모든 챌린지 참여 갯수와 참여 조회 
  static async getUserParticipants({ userId }){
    const participations = await ChallengeParticipation.findAllByUserId({ userId });
    const populatedParticipations = await Promise.all(
      participations.map(async (participation) => {  
        const challenge = await Challenge.findById(participation.challengeId);
        return { 
          userParticipantCount: participations.length,
          ...participation._doc,   
          challengeTitle: challenge.title,  // title 추가
          createdAt: updateTime.toKST(challenge.createdAt),
          updatedAt: updateTime.toKST(challenge.updatedAt)
        }; 
      }) 
    );  

    const newParticipations = {
      userChallengeCount: populatedParticipations.length,
      userChallengeList: populatedParticipations
    };
    return newParticipations;
  } 
*/