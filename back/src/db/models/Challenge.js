import { challengeModel } from "../schemas/challenge.js";

class Challenge {
  static async create(newChallenge) {
    const createdChallenge = await challengeModel.create(newChallenge);
    return createdChallenge;
  }
  
  static async findAll( ) {
    const challenges = await challengeModel.find( );
    return challenges;
  }

  static NoAsyncfindAll( ) {
    const challenges = challengeModel.find( );
    return challenges;
  }

  static async findAndCountAll(skip, limit) {
    const challenges = await UserModel.find()
                      .skip(skip)
                      .limit(limit)
                      .exec();
    const count = await challengeModel.countDocuments();
    return { challenges, count };
  }
  
  static async findById( _id ){
    const challenge = await challengeModel.findById( _id );
    return challenge
  }

  static async findOne( challengeId ){
    const challenge = await challengeModel.findOne( challengeId );
    return challenge
  }

  static NoAsyncfindById({ chllengeId }) {
    const challenge = challengeModel.findById({ _id: chllengeId });
    return challenge;
  }

  static async findAllByUserId({ userId }){
    const userChallenges = await challengeModel.find({ userId });;
    return userChallenges
  }

  // update
  static async update({ chllengeId, title, content, icon, weeks, dueDate }) {
    const updatedEducation = await challengeModel.findOneAndUpdate(
      {_id : chllengeId}
      ,{ title, content, icon, weeks, dueDate }
      ,{ new: true });

    return updatedEducation;
  }

  static async deleteById( chllengeId ) {
    await challengeModel.findByIdAndDelete({ _id: chllengeId });
    return ;
  }
  
}

export { Challenge };
