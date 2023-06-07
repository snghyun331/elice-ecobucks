import { ChallengeParticipationModel } from "../schemas/challenge-participation.js";

class ChallengeParticipation {
  static async create(newChallenge) {
    const createdChallenge = await ChallengeParticipationModel.create(newChallenge);
    return createdChallenge;
  }  

  static async findAll( ) {
    const Participations = await ChallengeParticipationModel.find( );
    return Participations;
  } 

  static NoAsyncfindAll({ challenge_id }) {
    const Participations = ChallengeParticipationModel.find({ challenge_id });
    return Participations;
  }
  
  static async findById({ _id }){
    const Participation = await ChallengeParticipationModel.findById({ _id });
    return Participation
  }

  static NoAsyncfindById({ _id }) {
    const Participation = ChallengeParticipationModel.findById({ _id });
    return Participation;
  }
  
  static async findAllByUserId({ user_id }){
    const UserChallenges = await ChallengeParticipationModel.find({ user_id });;
    return UserChallenges
  }

  // update
  static async update({ _id, image }) {
    const updatedEducation = await ChallengeParticipationModel.findOneAndUpdate(
      {_id : _id}
      ,{image}
      ,{new: true});

    return updatedEducation;
  }

  static async deleteById( _id ) {
    await ChallengeParticipationModel.findByIdAndDelete( _id );
    return ;
  }
  
}

export { ChallengeParticipation };
