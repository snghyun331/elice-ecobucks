import { participationModel } from "../schemas/challenge-participation.js";

class ChallengeParticipation {
  static async create(newChallenge) {
    const createdChallenge = await participationModel.create(newChallenge);
    return createdChallenge;
  }  

  static async findAll() {
    const participations = await participationModel.find();
    return participations;
  } 

  static async find({ userId, challengeId }) {
    const participations = await participationModel.find({ userId, challengeId });
    return participations;
  } 

  static NoAsyncfindAll({ challengeId }) {
    const participations = participationModel.find({ challengeId });
    return participations;
  }
  
  static async findById({ _id }){
    const participation = await participationModel.findById({ _id });
    return participation
  }

  static async findOne({ challengeId }){
    const participation = await participationModel.findOne({ challengeId });
    return participation
  }

  static NoAsyncfindById({ _id }) {
    const participation = participationModel.findById({ _id });
    return participation;
  }
  
  static async findAllByUserId({ userId }){
    const userParticipations = await participationModel.find({ userId });;
    return userParticipations
  }
  
  static async findAndCountAll( userId, skip, limit ){
    const userParticipations = await participationModel.find({userId})
                      .skip(skip)
                      .limit(limit)
                      .exec();
    const count = await participationModel.countDocuments();
    return { userParticipations, count }
  }

  // update
  static async update({ _id, imageId }) {
    const updateParticipation = await participationModel.findOneAndUpdate(
      { _id : _id }
      ,{ imageId }
      ,{ new: true });

    return updateParticipation               ;
  }

  static async deleteById(_id) {
    await participationModel.findByIdAndDelete(_id);
    return ;
  }
  
}

export { ChallengeParticipation };
