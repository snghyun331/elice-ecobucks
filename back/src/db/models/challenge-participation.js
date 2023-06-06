import { ChallengeParticipationModel } from "../schemas/challenge-participation.js";

class ChallengeParticipation {
  static async create(newChallenge) {
    const createdChallenge = await ChallengeParticipationModel.create(newChallenge);
    return createdChallenge;
  }  

  static async findAll() {
    const Participations = await ChallengeParticipationModel.find({});
    return Participations;
  } 
  
  static async findById({ chellenge_id }){
    const Participation = await ChallengeParticipationModel.findById({ chellenge_id });
    return Participation
  }
  
  static async findAllByUserId({ user_id }){
    const UserChallenges = await ChallengeParticipationModel.find({ user_id });;
    return UserChallenges
  }

  // update
  static async update({ user_id, title, content, icon, DueDate }) {
    const updatedEducation = await ChallengeParticipationModel.findOneAndUpdate(
      {_id : user_id}
      ,{title, content, icon, DueDate}
      ,{new: true});

    return updatedEducation;
  }

  static async deleteById( challengeId ) {
    await ChallengeParticipationModel.findByIdAndDelete(challengeId);
    return ;
  }
  
}

export { ChallengeParticipation };
